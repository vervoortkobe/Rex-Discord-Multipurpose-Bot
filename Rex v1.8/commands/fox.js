const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    fetch('https://some-random-api.ml/img/fox')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    const foxEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🦊 | ${client.user.username} Fox`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(data.link)
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(foxEmbed);
    })
  }

  module.exports.help = {
    name: "fox"
}