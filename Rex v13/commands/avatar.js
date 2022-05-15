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
      const avatarEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🖼️ | Avatar`)
      .setDescription(`**${message.author}'s Avatar:**\n[PNG](${message.author.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".png?size=640"}) | [GIF](${message.author.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".gif?size=640"}) | [JPG](${message.author.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".jpg?size=640"}) | [WEBP](${message.author.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".webp?size=640"})`)
      .setImage(message.author.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".png?size=640")
      return message.channel.send({ embeds: [ avatarEmbed ]})
      .then(message.react("🖼️"));
    }

    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    const avatarEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🖼️ | Avatar`)
    .setDescription(`**${member}'s Avatar:**\n[PNG](${member.user.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".png?size=640"}) | [GIF](${member.user.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".gif?size=640"}) | [JPG](${member.user.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".jpg?size=640"}) | [WEBP](${member.user.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".webp?size=640"})`)
    .setImage(member.user.displayAvatarURL({ dynamic: true }).split(".webp")[0] + ".png?size=640")
    return message.channel.send({ embeds: [ avatarEmbed ]})
    .then(message.react("🖼️"));
  }

  module.exports.help = {
    name: "avatar",
    aliases: ["usericon", "userlogo"],
    category: "other"
}