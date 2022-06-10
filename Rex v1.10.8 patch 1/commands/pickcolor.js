const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    var color = Math.floor(Math.random() * 16777215).toString(16);
    color = "#" + ("000000" + color).slice(-6);

    const pickcolorEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⛑️ | ${client.user.username} Pick Color`)
    .saddField(`Color Hex Code`, `\`${color}\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(pickcolorEmbed);
  }

module.exports.help = {
    name: "pickcolor"
}