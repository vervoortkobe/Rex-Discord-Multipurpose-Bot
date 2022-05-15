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

    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't lock this channel, because I don't have permissions to manage channels!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't lock the channel, you don't have the correct permissions (MANAGE_CHANNELS) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      "SEND_MESSAGES": false
    });

    message.delete(); 

    const lockEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setDescription(`${v} **|** ***${message.channel} has been locked!***`)
    message.channel.send({ embeds: [ lockEmbed ]});

    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const lockLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setDescription(`**» CHANNEL_LOCK:**\n${message.author} **locked ${message.channel}**!`)
      logChannel.send({ embeds: [ lockLogEmbed ]});
    }
  }

  module.exports.help = {
    name: "lock",
    aliases: [],
    category: "mod"
}