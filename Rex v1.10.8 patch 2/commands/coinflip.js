const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    let {data} = await fetch;

    if(!args[0]) {
      const coinflipUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`💰 | ${client.user.username} Coinflip`)
      .setDescription(`Usage: **${prefix}coinflip <heads/tails>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(coinflipUsageEmbed);

    } else {

    fetch('https://and-here-is-my-code.glitch.me/coinflip')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    const coinflipEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`💰 | ${client.user.username} Coinflip`)
    .setImage(data.Link)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(coinflipEmbed);
    })
  }
}

  module.exports.help = {
    name: "coinflip"
}