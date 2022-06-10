const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const servercountEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Servercount`)
    .addField(`Total Count`, `\`${message.guild.members.size}\` Members`, true)
    .addField(`Human Count`, `\`${message.guild.members.filter(member => !member.user.bot).size}\` Humans`, true)
    .addField(`Bot Count`, `\`${message.guild.members.filter(member => member.user.bot).size}\` Bots`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(servercountEmbed);
  }

  module.exports.help = {
    name: "servercount"
}