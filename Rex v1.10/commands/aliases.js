const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const helpEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Aliases`)
    .setDescription(`**${prefix}clear** - ${prefix}purge\n**${prefix}new** - ${prefix}ticket\n**${prefix}servercount** - ${prefix}count\n**${prefix}penissize** - ${prefix}penis\n**${prefix}chatbot** - ${prefix}cb\n**${prefix}whois** - ${prefix}userinfo`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpEmbed);
  }

  module.exports.help = {
    name: "aliases"
}