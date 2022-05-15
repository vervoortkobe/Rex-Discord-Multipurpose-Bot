const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let eevee = client.emojis.cache.get("787058446092075019");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    let {data} = await fetch;

    fetch("https://aussie-apis.ml/img/eevee")
    .then(res => res.json()).then(data => {
      if(!data.Link) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send(errorEmbed);
      }

      const eeveeEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setTitle(`${eevee} | Eevee`)
      .setImage(data.Link)
      message.channel.send(eeveeEmbed)
      .then(message.react(`${eevee}`));
    });
  }

  module.exports.help = {
    name: "eevee",
    aliases: [],
    category: "imgs"
}