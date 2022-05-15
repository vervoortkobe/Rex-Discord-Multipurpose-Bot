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

    fetch("https://and-here-is-my-code.glitch.me/img/fish")
    .then(res => res.json()).then(data => {
      if(!data.Link) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      const fishEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🐟 | Fish`)
      .setImage(data.Link)
      message.channel.send({ embeds: [ fishEmbed ]})
      .then(message.react("🐟"));
    });
  }

  module.exports.help = {
    name: "fish",
    aliases: [],
    category: "imgs"
}