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

    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unlock this member, because I don't have permissions to manage roles!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't mute this member, you don't have the correct permissions (MANAGE_ROLES) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Mute`)
      .setDescription(`${x} **|** ***Usage: ${prefix}mute <@member/member ID> [reason]***`)
      .setFooter(`<> = required | [] = optional`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let muteRole = message.guild.roles.cache.find(r => r.name ==="Muted");

    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(member.id === message.author.id) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't mute yourself!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(member.bot) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't mute a bot!!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(member.kickable === false) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't mute this member! Does he/she have a higher role than me?***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
    
    if(member.roles.cache.has(muteRole)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't mute this member, because he/she is already muted!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
      
    } else {

      let reason = args.slice(1).join(" ");
      if(!reason) reason = "No reason given";

      if(!muteRole) message.guild.roles.create({
        name: "Muted",
        color: "#000000",
        permissions: []
      });
      member.roles.add(muteRole, `This member has been muted by ${message.author.tag}, because of ${reason}!`);

      message.delete();

      const muteEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***${member} has been muted, because of ${reason}!***`)
      message.channel.send({ embeds: [ muteEmbed ]});

      const mutePmEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⛑️ | Muted`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`You were \`muted\` on \`${message.guild.name}\`, because of \`${reason}\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Mute\`\n**» Reason:** \`${reason}\``)
      member.send({ embeds: [ mutePmEmbed ]})
      .catch(err => console.log(err));

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const muteLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**» MEMBER_MUTE:**\n${message.author} **muted ${member}, because of ${reason}**!`)
        logChannel.send({ embeds: [ muteLogEmbed ]});
      }
    }
  }

  module.exports.help = {
    name: "mute",
    aliases: [],
    category: "mod"
}