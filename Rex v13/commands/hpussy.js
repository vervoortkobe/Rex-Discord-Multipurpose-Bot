const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    let {data} = await fetch;

    if(message.channel.nsfw === false) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't return nsfw content, because this isn't an nsfw channel!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
    
    if(message.channel.nsfw === true) {

    fetch("https://nekos.life/api/v2/img/pussy_jpg")
    .then(res => res.json()).then(data => {
      if(!data.url) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

        message.channel.send({ files: [data.url] });
      });
    }
  }

  module.exports.help = {
    name: "hpussy",
    aliases: [],
    category: "nsfw"
}