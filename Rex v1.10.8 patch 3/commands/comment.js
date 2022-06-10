const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let comment = encodeURIComponent(args.join(' '));
    const commentPic = (`https://some-random-api.ml/beta/youtube-comment?username=${message.author.username}&comment=${comment}&avatar=${message.author.displayAvatarURL}`);

    if(!args[0]) {
    const commentUsageEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`💬 | ${client.user.username} Comment`)
    .setDescription(`Usage: **${prefix}comment <comment>**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    return message.channel.send(commentUsageEmbed);
  }

    message.delete()

    const commentEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`💬 | ${client.user.username} Comment`)
    .setImage(commentPic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(commentEmbed);
  }

  module.exports.help = {
    name: "comment"
}