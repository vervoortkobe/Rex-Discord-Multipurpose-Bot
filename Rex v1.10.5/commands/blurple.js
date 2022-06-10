const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
      if(!member) {
        member = message.author
      }
    const blurplePic = (`https://some-random-api.ml/beta/blurple?avatar=${member.avatarURL}`);

    const blurpleEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`☻ | ${client.user.username} Blurple`)
    .setImage(blurplePic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(blurpleEmbed);
  }

  module.exports.help = {
    name: "blurple"
}