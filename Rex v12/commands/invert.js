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
      const invertPic = (`https://some-random-api.ml/canvas/invert?avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`);

      const invertEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`☻ | Invert`)
      .setImage(invertPic)
      return message.channel.send(invertEmbed)
      .then(message.react("☻"));
    }

    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send(errorEmbed);
    }

    const invertPic = (`https://some-random-api.ml/canvas/invert?avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`);

    const invertEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`☻ | Invert`)
    .setImage(invertPic)
    message.channel.send(invertEmbed)
    .then(message.react("☻"));
  }

  module.exports.help = {
    name: "invert",
    aliases: [],
    category: "imgs"
}