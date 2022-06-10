const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const youtubeEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⏯️ | Check Tsunami's YouTube Channel!`)
    .setDescription(`[Tsunami's YouTube](http://rexbot.ga/yt)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(youtubeEmbed);
  }

  module.exports.help = {
    name: "youtube"
}