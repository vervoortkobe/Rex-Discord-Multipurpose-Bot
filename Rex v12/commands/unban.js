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

    if(!message.guild.me.permissions.has("BAN_MEMBERS")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unban this user, because I don't have ban permissions!***`)
      return message.channel.send(errorEmbed);
    }

    if(!message.member.permissions.has("BAN_MEMBERS")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unban this user, you don't have the correct permissions (BAN_MEMBERS) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Unban`)
      .setDescription(`${x} **|** ***Usage: ${prefix}unban <user ID>***`)
      return message.channel.send(usageEmbed);
    }
    
    message.delete();

    let member = client.users.cache.get(`${args[0]}`);

    const unbanEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setDescription(`${v} **|** ***${member.tag} has been unbanned!***`)
    message.channel.send(unbanEmbed);

    message.guild.members.unban(`${args[0]}`);

    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const unbanLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setDescription(`**» USER_UNBAN:**\n${message.author} **unbanned ${member.tag}**!`)
      .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
      logChannel.send(unbanLogEmbed);
    }
  }

  module.exports.help = {
    name: "unban",
    aliases: [],
    category: "mod"
}