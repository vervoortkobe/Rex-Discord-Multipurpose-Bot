const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const siteEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Site`)
    .setDescription(`[Visit rexbot.ga](http://rexbot.ga)\n[Visit forum.rexbot.ga](http://forum.rexbot.ga)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(siteEmbed);
  }

  module.exports.help = {
    name: "site"
}