const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const ban = client.emojis.cache.get("808732827406958632");

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
        .setAuthor(`⚙️ | Abuseban`)
        .setDescription(`${x} **|** ***Usage: ${prefix}abuseban <@user/user ID> [reason]***`)
        .setFooter(`<> = required | [] = optional`)
        return message.channel.send({ embeds: [ usageEmbed ]});
      }

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member) {

        if(args[0] === message.author.id) {
          const errorEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setDescription(`${x} **|** ***You can't ban yourself!***`)
          return message.channel.send({ embeds: [ errorEmbed ]});
        }
    
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "The Ban Hammer has spoken!";
  
        message.delete();
        
        const banEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***\`${args[0]}\` has been banned, because of ${reason}!***`)
        message.channel.send({ embeds: [ banEmbed ]});
        
        message.guild.members.ban(`${args[0]}`, { days: 7, reason: reason });
  
        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const banLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(member.user.displayAvatarURL())
          .setDescription(`**» MEMBER_BAN_ADD:**\n${message.author} **banned \`${args[0]}\`, because of ${reason}**!`)
          .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
          logChannel.send({ embeds: [ banLogEmbed ]});
        }

        return;
      }

      if(member.id && member.id === message.author.id) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***You can't ban yourself!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }
      
      if(member.bannable === false) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't ban this user! Does he/she have a higher role than me?***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }
      
      let reason = args.slice(1).join(" ");
      if(!reason) reason = "The Ban Hammer has spoken!";

      message.delete();

      const banEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***${member.user.tag} has been banned, because of ${reason}!***`)
      message.channel.send({ embeds: [ banEmbed ]});

      const banPmEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setTitle(`${ban} | Banned`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`You were \`banned\` from \`${message.guild.name}\`, because of \`${reason}\`!`)
      .setDescription(`**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Ban\`\n**» Reason:** \`${reason}\``)
      member.send({ embeds: [ banPmEmbed ]})
      .catch(err => console.log(err));
      
      message.guild.members.ban(`${member.id}`, { days: 7, reason: reason })
      .catch(err => {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      });

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const banLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**» MEMBER_BAN_ADD:**\n${message.author} **banned ${member.user.tag}, because of ${reason}**!`)
        .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
        logChannel.send({ embeds: [ banLogEmbed ]});
      }
    }
  }

  module.exports.help = {
    name: "abuseban",
    aliases: [],
    category: "owner"
}