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

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Wink`)
      .setDescription(`${x} **|** ***Usage: ${prefix}wink <@member/member ID>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
    
    fetch("https://some-random-api.ml/animu/wink")
    .then(res => res.json()).then(data => {
      if(!data.link) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      message.channel.send(`😉 | ${message.author} winked to ${member}!`);

      const winkEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`😉 | Wink`)
      .setImage(data.link)
      message.channel.send({ embeds: [ winkEmbed ]})
      .then(message.react("😉"));
    });
  }

  module.exports.help = {
    name: "wink",
    aliases: [],
    category: "imgs"
}