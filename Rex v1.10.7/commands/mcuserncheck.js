const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    fetch(`https://some-random-api.ml/mc?username=${args[0]}`)
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    if(!args[0]) {
        const mcuserncheckUsageEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`⚙️ | ${client.user.username} MC Username Checker`)
        .setDescription(`Usage: **${prefix}mcusername <mc username>**`)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        message.channel.send(mcuserncheckUsageEmbed);
    }

    if(data.error) {
      const mcuserncheckNotTakenEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⛏️ | ${client.user.username} MC Username Checker`)
      .addField(`Username`, `\`${args[0]}\``)
      .addField(`UUID`, `*\`None\`*`)
      .addField(`Taken/Not Taken`, `\`Not Taken\``)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      .setTimestamp()
      message.channel.send(mcuserncheckNotTakenEmbed);

      } else {

      const mcuserncheckTakenEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⛏️ | ${client.user.username} MC Username Checker`)
      .addField(`Username`, `\`${data.username}\``)
      .addField(`UUID`, `\`${data.full_uuid}\``)
      .addField(`Taken/Not Taken`, `\`Taken\``)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      .setTimestamp()
      message.channel.send(mcuserncheckTakenEmbed);
      }
    }
  )}

  module.exports.help = {
    name: "mcuserncheck"
}