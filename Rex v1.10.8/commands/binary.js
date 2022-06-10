const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let input = message.content.split(" ").slice(2).join(" ");

    if(!args[0] || !input) {
      const binaryUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`🖥️ | ${client.user.username} Binary`)
      .setDescription(`Usage: **${prefix}binary <enc/dec> <input>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(binaryUsageEmbed);
    }

    if(args[0] === `enc`) {

        fetch(`https://some-random-api.ml/binary?text=${input}`)
        .then(res => res.json()).then(data => {
          if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

        const encbinaryEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`🖥️ | ${client.user.username} Binary Encode`)
        .addField(`Input Text`, `\`${input}\``)
        .addField(`Output Binary`, `\`${data.binary}\``)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        message.channel.send(encbinaryEmbed)
      }
    )}

    if(args[0] === `dec`) {

        fetch(`https://some-random-api.ml/binary/?decode=${input}`)
        .then(res => res.json()).then(data => {
            if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);
  
        const decbinaryEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`🖥️ | ${client.user.username} Binary Deccode`)
        .addField(`Input Binary`, `\`${input}\``)
        .addField(`Output Text`, `\`${data.text}\``)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        message.channel.send(decbinaryEmbed)
      }
    )}
  }

  module.exports.help = {
    name: "binary"
}