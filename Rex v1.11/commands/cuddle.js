const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;
    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);

    fetch('https://nekos.life/api/v2/img/cuddle')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

      if (!memberToFind) {
        return message.channel.send(`❌ | Pls mention a valid member of this server!`);
      }
    message.channel.send(`🤗 | <@${message.author.id}> just cuddled <@${memberToFind.user.id}>!`);

    const cuddleEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤗 | ${client.user.username} Cuddle`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(data.link)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(cuddleEmbed);
    })
  }

  module.exports.help = {
    name: "cuddle"
}