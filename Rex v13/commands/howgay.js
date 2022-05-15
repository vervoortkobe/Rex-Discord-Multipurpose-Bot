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
      let random = Math.floor((Math.random() * 100));

      const howgayEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`🏳️‍🌈 | Howgay`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`${message.author} is \`${random}%\` gay!`)
      return message.channel.send({ embeds: [ howgayEmbed ]})
      .then(message.react("🏳️‍🌈"));
    }

    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    let random = Math.floor((Math.random() * 100));

    const howgayEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setAuthor(`🏳️‍🌈 | Howgay`)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`${member} is \`${random}%\` gay!`)
    message.channel.send({ embeds: [ howgayEmbed ]})
    .then(message.react("🏳️‍🌈"));
  }

  module.exports.help = {
    name: "howgay",
    aliases: [],
    category: "fun"
}