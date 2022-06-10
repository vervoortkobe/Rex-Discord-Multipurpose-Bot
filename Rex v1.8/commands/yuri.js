const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    if(message.channel.nsfw === false) return message.channel.send(`❌ | Couldn't generate an nsfw image, because this isn't an nsfw channel!`);
    if(message.channel.nsfw === true){

    fetch('https://api.computerfreaker.cf/v1/yuri')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    const yuriEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🔞 | ${client.user.username} Yuri`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(data.url)
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(yuriEmbed);
      })
    }
  }

  module.exports.help = {
    name: "yuri"
}