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

    fetch("https://some-random-api.ml/img/whale")
    .then(res => res.json()).then(data => {
      if(!data.link) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send(errorEmbed);
      }

      const whaleEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🐳 | Whale`)
      .setImage(data.link)
      message.channel.send(whaleEmbed)
      .then(message.react("🐳"));
    });
  }

  module.exports.help = {
    name: "whale",
    aliases: [],
    category: "imgs"
}