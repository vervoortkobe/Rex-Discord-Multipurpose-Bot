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

    if (message.channel.nsfw === true) {

      let random = Math.floor((Math.random() * 100));

      fetch("https://api.oboobs.ru/boobs/0/100")
      .then(res => res.json()).then(data => {
        if(!data) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send(errorEmbed);
      }

        let image = `https://media.oboobs.ru/${data[random].preview}`;
        message.channel.send({ files: [image] });
      });
    } else {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't return nsfw content, because this isn't an nsfw channel!***`)
      return message.channel.send(errorEmbed);
    }
  }

  module.exports.help = {
    name: "boobs",
    aliases: [],
    category: "nsfw"
}