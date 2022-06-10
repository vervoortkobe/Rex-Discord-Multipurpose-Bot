const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
     
    let {data} = await fetch;

    fetch(`https://some-random-api.ml/chatbot/beta?message=${args[0]}`)
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);
    
    
    if(!args[0]){
      const chatbotUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`🤖 | ${client.user.username} Chatbot`)
      .setDescription(`Usage: **${prefix}cb <message>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(chatbotUsageEmbed);
    }

    message.channel.send(data.response);
    })
  }

  module.exports.help = {
    name: "cb"
}