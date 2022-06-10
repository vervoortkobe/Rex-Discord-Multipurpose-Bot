const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;
    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);

    fetch('https://some-random-api.ml/animu/wink')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

      if (!memberToFind) {
        return message.channel.send(`❌ | Pls mention a valid member of this server!`);
      }
    message.channel.send(`😉 | <@${message.author.id}> just winked to <@${memberToFind.user.id}>!`);

    const winkEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😉 | ${client.user.username} Wink`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(data.link)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(winkEmbed);
    })
  }

  module.exports.help = {
    name: "wink"
}