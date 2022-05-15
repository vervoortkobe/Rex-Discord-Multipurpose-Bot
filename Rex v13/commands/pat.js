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
      .setAuthor(`⚙️ | Pat`)
      .setDescription(`${x} **|** ***Usage: ${prefix}pat <@member/member ID>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    fetch("https://nekos.life/api/v2/img/pat")
    .then(res => res.json()).then(data => {
      if(!data.url) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      message.channel.send(`😄 | ${message.author} patted ${member}!`);

      const patEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`😄 | Pat`)
      .setImage(data.url)
      message.channel.send({ embeds: [ patEmbed ]})
      .then(message.react("😄"));
    });
  }

  module.exports.help = {
    name: "pat",
    aliases: [],
    category: "imgs"
}