const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    if(!args[0]){
      const onetwoUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`1️⃣2️⃣ | ${client.user.username} One Two`)
      .setDescription(`Usage: **${prefix}onetwo <poll/suggestion>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(onetwoUsageEmbed);
    }

    const onetwoEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`1️⃣2️⃣ | ${client.user.username} One Two`)
    .setDescription(args.join(' '))
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send({embed: onetwoEmbed}).then(embedMessage => {
      embedMessage.react('1️⃣').then(() => { 
        embedMessage.react('2️⃣')});
    })
  }

  module.exports.help = {
    name: "onetwo"
}