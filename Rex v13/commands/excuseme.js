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
    const excusemePic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/excuseme/?accesstoken=${process.env.TSAPIKEY}&text=${text}`, "excuseme.png");

    if(!args[0]) {
    const usageEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setAuthor(`⚙️ | Excuseme`)
    .setDescription(`${x} **|** ***Usage: ${prefix}excuseme <text>***`)
    return message.channel.send({ embeds: [ usageEmbed ]});
  }

    const excusemeEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`😳 | Excuseme`)
    .setImage("attachment://excuseme.png")
    message.channel.send({ embeds: [ excusemeEmbed ], files: [ excusemePic ]})
    .then(message.react("😳"));
  }

  module.exports.help = {
    name: "excuseme",
    aliases: [],
    category: "imgs"
}