const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const aliasesEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Aliases (8)`)
    .setDescription(`**${prefix}clear** - ${prefix}purge\n**${prefix}new** - ${prefix}ticket\n**${prefix}nickname** - ${prefix}nick\n**${prefix}servercount** - ${prefix}count\n**${prefix}whois** - ${prefix}userinfo\n**${prefix}chatbot** - ${prefix}cb\n**${prefix}level** - ${prefix}lvl\n**${prefix}penissize** - ${prefix}penis`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(aliasesEmbed);
  }

  module.exports.help = {
    name: "aliases"
}