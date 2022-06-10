const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    let {data} = await fetch;

    fetch('https://nekos.life/api/why')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    const whyEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤷‍♀️ | ${client.user.username} why`)
    .setDescription(`**${data.why}**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(whyEmbed);
    })
  }

  module.exports.help = {
    name: "why"
}