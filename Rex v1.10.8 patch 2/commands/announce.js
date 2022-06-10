const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let announcement = args.join(' ');

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`❌ | Couldn't announce your announcement, because you do not have the correct permissions (BAN_MEMBERS) to do this!`);

    if(!announcement) {
    const announceUsageEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`📣 | ${client.user.username} Announce`)
    .setDescription(`Usage: **${prefix}announce <announcement>**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    return message.channel.send(announceUsageEmbed);
  }

    message.delete()

    const announceEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`📣 | ${client.user.username} Announce`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(announcement)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(announceEmbed);
  }

  module.exports.help = {
    name: "announce"
}