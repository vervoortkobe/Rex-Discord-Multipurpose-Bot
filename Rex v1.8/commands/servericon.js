const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const servericonEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Servericon`)
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setImage(message.guild.iconURL)
    .setFooter(`© Rex was made by Tsunami#6271`)
    message.channel.send(servericonEmbed);
  }

  module.exports.help = {
    name: "servericon"
}