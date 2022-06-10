const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const servericonEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Servericon`)
    .addField(`Server Name`, message.guild.name, true)
    .setImage(message.guild.iconURL)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(servericonEmbed);
  }

  module.exports.help = {
    name: "servericon"
}