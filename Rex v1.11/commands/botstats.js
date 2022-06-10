const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const botstatsEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Botstats`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find my stats:`)
    .addField(`Servers`, `Serving \`${client.guilds.size}\` servers!`, true)
    .addField(`Users`, `Serving \`${client.users.size}\` users!`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(botstatsEmbed);
  }

  module.exports.help = {
    name: "botstats"
}