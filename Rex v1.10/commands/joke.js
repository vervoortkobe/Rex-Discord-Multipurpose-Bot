const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    let {data} = await fetch;

    fetch('https://sv443.net/jokeapi/category/any?blacklistFlags=nsfw')
    .then(res => res.json()).then(data => {
      if(!data.joke) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    if(data.type === 'single') {

    const singlejokeEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😂 | ${client.user.username} Single Joke`)
    .addField(`Category`, data.category)
    .addField(`Type`, data.type)
    .addField(`Joke`, `**${data.joke}**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(singlejokeEmbed);
    }

    if(data.type === 'twopart') {

    const twopartjokeEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😂 | ${client.user.username} Twopart Joke`)
    .addField(`Category`, data.category)
    .addField(`Type`, data.type)
    .addField(`Joke`, `**${data.setup}**`)
    .addField(`Answer`, `**${data.delivery}**`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(twopartjokeEmbed);
    }
    })
  }

module.exports.help = {
  name: "joke"
}