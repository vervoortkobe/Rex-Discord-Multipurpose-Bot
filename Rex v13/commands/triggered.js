const Discord = require("discord.js");
const fs = require("fs");

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
      const triggeredPic = new Discord.MessageAttachment(`https://some-random-api.ml/canvas/triggered?avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "triggered.gif");

      const triggeredEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`😖 | Triggered`)
      .setImage("attachment://triggered.gif")
      return message.channel.send({ embeds: [ triggeredEmbed ], files: [ triggeredPic ]})
      .then(message.react("😖"));
    }

    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    const triggeredPic = new Discord.MessageAttachment(`https://some-random-api.ml/canvas/triggered?avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`, "triggered.gif");

    const triggeredEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`😖 | Triggered`)
    .setImage("attachment://triggered.gif")
    message.channel.send({ embeds: [ triggeredEmbed ], files: [ triggeredPic ]})
    .then(message.react("😖"));
  }

  module.exports.help = {
    name: "triggered",
    aliases: [],
    category: "imgs"
}