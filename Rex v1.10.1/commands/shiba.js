const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    fetch('http://shibe.online/api/shibes')
    .then(res => res.json()).then(body => {
      if(!body) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    const shibaEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🐕 | ${client.user.username} Shiba`)
    .setImage(body[0])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(shibaEmbed);
    })
  }

  module.exports.help = {
    name: "shiba"
}