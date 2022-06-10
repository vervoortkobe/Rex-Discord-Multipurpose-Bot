const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const versionEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Version`)
    .addField(`${client.user.username} Current Version`, `\`${client.user.username} v1.10.5\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(versionEmbed);
    }

  module.exports.help = {
    name: "version"
}