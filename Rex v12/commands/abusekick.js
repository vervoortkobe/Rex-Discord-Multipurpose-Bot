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

    if(message.author.id === "408289224761016332") {

      if(!args[0]) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | Abusekick`)
        .setDescription(`${x} **|** ***Usage: ${prefix}abusekick <@member/member ID> [reason]***`)
        .setFooter(`<> = required | [] = optional`)
        return message.channel.send(usageEmbed);
      }

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Please mention a valid member!***`)
        return message.channel.send(errorEmbed);
      }

      if(member.id === message.author.id) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***You can't kick yourself!***`)
        return message.channel.send(errorEmbed);
      }

      if(member.kickable === false) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't kick this member! Does he/she have a higher role than me?***`)
        return message.channel.send(errorEmbed);
      }
      
      let reason = args.slice(1).join(" ");
      if(!reason) reason = "No reason given";

      message.delete();
      
      const kickEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***${member.user.tag} has been kicked, because of ${reason}!***`)
      message.channel.send(kickEmbed);

      const kickPmEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⛑️ | Kicked`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`You were \`kicked\` from \`${message.guild.name}\`, because of \`${reason}\`!`)
      .setDescription(`**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Kick\`\n**» Reason:** \`${reason}\``)
      member.send(kickPmEmbed)
      .catch(err => console.log(err));
      
      member.kick(reason)
      .catch(err => {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send(errorEmbed);
      });

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const kickLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**» MEMBER_KICK:**\n${message.author} **kicked ${member.user.tag}, because of ${reason}**!`)
        .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
        logChannel.send(kickLogEmbed);
      }
    }
  }

  module.exports.help = {
    name: "abusekick",
    aliases: [],
    category: "owner"
}