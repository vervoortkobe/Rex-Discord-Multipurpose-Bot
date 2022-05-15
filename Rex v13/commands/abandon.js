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

    let text = encodeURIComponent(args.join(" "));
    const abandonPic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/abandon/?accesstoken=${process.env.TSAPIKEY}&text=${text}`, "abandon.png");

    if(!args[0]) {
    const usageEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setAuthor(`⚙️ | Abandon`)
    .setDescription(`${x} **|** ***Usage: ${prefix}abandon <text>***`)
    return message.channel.send({ embeds: [ usageEmbed ] });
  }

    const abandonEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`👋 | Abandon`)
    .setImage("attachment://abandon.png")
    message.channel.send({ embeds: [ abandonEmbed ], files: [ abandonPic ] })
    .then(message.react("👋"));
  }

  module.exports.help = {
    name: "abandon",
    aliases: [],
    category: "imgs"
}