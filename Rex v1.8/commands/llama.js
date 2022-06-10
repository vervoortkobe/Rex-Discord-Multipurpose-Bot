const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    let {data} = await fetch;

    fetch('https://apis.duncte123.me/llama')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    const llamaEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🐪 | ${client.user.username} Llama`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(data.data.file)
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(llamaEmbed);
    })
  }

  module.exports.help = {
    name: "llama"
}