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

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!args[0]) {
      const wantedPic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/wanted/?accesstoken=${process.env.TSAPIKEY}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "wanted.png");

      const wantedEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤠 | Wanted`)
      .setImage("attachment://wanted.png")
      return message.channel.send({ embeds: [ wantedEmbed ], files: [ wantedPic ]})
      .then(message.react("🤠"));
    }

    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    const wantedPic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/wanted/?accesstoken=${process.env.TSAPIKEY}&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`, "wanted.png");

    const wantedEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🤠 | Wanted`)
    .setImage("attachment://wanted.png")
    message.channel.send({ embeds: [ wantedEmbed ], files: [ wantedPic ]})
    .then(message.react("🤠"));
  }

  module.exports.help = {
    name: "wanted",
    aliases: [],
    category: "imgs"
}