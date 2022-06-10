const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    fetch('https://nekos.life/api/v2/img/goose')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    const gooseEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🦆 | ${client.user.username} Goose`)
    .setImage(data.url)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(gooseEmbed);
    })
  }

  module.exports.help = {
    name: "goose"
}