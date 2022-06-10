const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const sayMessage = args.join(" ");

    if(!sayMessage) {
      const sayUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Say`)
      .setDescription(`Usage: **${prefix}say <message>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(sayUsageEmbed);
    }

    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

  module.exports.help = {
    name: "say"
}