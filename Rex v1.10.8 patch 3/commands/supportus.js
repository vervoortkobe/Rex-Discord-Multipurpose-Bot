const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const supportusEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Support Us`)
    .setDescription(`[Support the project!](http://rexbot.ga/supportus)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(supportusEmbed);
  }

  module.exports.help = {
    name: "supportus"
}