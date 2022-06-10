const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const supportEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Support`)
    .setDescription(`[Join Rex Support Server!](http://rexbot.ga/support)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(supportEmbed);
  }

  module.exports.help = {
    name: "support"
}