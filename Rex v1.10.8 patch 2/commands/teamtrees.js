const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    fetch('http://teamtrees-api.herokuapp.com/status/')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);
      
    const teamtreesEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🌲 | ${client.user.username} #TeamTrees`)
    .addField(`🌲 | Planted Trees`, `\`${data.trees}\` trees planted!`)
    .addField(`💰 | Donate to #TeamTrees`, `[Donate to teamtrees.org!](https://teamtrees.org/)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(teamtreesEmbed)
    })
  }

  module.exports.help = {
    name: "teamtrees"
}