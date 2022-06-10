const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const supportserverEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Api`)
    .setDescription(`[Check status.hostvalues.eu!](http://rexbot.ga/api)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(supportserverEmbed);
  }

  module.exports.help = {
    name: "api"
}