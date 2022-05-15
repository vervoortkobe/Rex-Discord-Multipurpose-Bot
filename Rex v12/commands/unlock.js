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

    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unlock this channel, because I don't have permissions to manage channels!***`)
      return message.channel.send(errorEmbed);
    }

    if(!message.member.permissions.has("MANAGE_CHANNELS")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't unlock this channel, you don't have the correct permissions (MANAGE_CHANNELS) to do this!***`)
      return message.channel.send(errorEmbed);
    }
    
    let everyone = message.guild.roles.everyone;
    
    message.channel.updateOverwrite(everyone, {
      "SEND_MESSAGES": true
    });

    message.delete();

    const unlockEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setDescription(`${v} **|** ***${message.author} unlocked ${message.channel}!***`)
    message.channel.send(unlockEmbed);

    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const lockdownLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setDescription(`**» CHANNEL_UNLOCK:**\n${message.author} **unlocked ${message.channel}**!`)
      logChannel.send(lockdownLogEmbed);
    }
  }

  module.exports.help = {
    name: "unlock",
    aliases: [],
    category: "mod"
}