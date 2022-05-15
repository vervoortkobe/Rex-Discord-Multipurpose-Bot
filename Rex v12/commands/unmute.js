const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!message.guild.me.permissions.has("MANAGE_ROLES")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unmute this member, because I don't have permissions to manage roles!***`)
      return message.channel.send(errorEmbed);
    }

    if(!message.member.permissions.has("MANAGE_ROLES")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unmute this member, you don't have the correct permissions (MANAGE_ROLES) to do this!***`)
      return message.channel.send(errorEmbed);
    }
    
    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Unmute`)
      .setDescription(`${x} **|** ***Usage: ${prefix}unmute <@member/member ID>***`)
      return message.channel.send(usageEmbed);
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send(errorEmbed);
    }

    if(member.id === message.author.id) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't unmute yourself!***`)
      return message.channel.send(errorEmbed);
    }

    if(member.bot) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't unmute a bot!***`)
      return message.channel.send(errorEmbed);
    }

    if(member.kickable === false) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unmute this member! Does he/she have a higher role than me?***`)
      return message.channel.send(errorEmbed);
    }
    
    if(!member.roles.cache.has(muteRole)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unmute this member, because he/she isn't muted!***`)
      return message.channel.send(errorEmbed);

    } else {

      if(!muteRole) message.guild.roles.create({
        data: {
          name: "Muted",
          color: "#000000",
          permissions: []
        }
      });
      member.roles.remove(muteRole, `This member has been unmuted by ${message.author.tag}!`);

      message.delete();

      const unmuteEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***${member} has been unmuted!***`)
      message.channel.send(unmuteEmbed);

      const unmutePmEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⛑️ | Unmuted`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`You were \`unmuted\` on \`${message.guild.name}\`!\n**» Server:** \`${message.guild.name}\``)
      member.send(unmutePmEmbed)
      .catch(err => console.log(err));

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const unmuteLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**» MEMBER_UNMUTE:**\n${message.author} **unmuted ${member}**!`)
        logChannel.send(unmuteLogEmbed);
      }
    }
  }

  module.exports.help = {
    name: "unmute",
    aliases: [],
    category: "mod"
}