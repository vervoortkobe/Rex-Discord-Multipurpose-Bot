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

    if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't send your poll, because I don't have permissions to manage messages!***`)
      return message.channel.send(errorEmbed);
    }

    if(!message.member.permissions.has("MANAGE_MESSAGES")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't send your poll, you don't have the correct permissions (MANAGE MESSAGES) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Poll`)
      .setDescription(`${x} **|** ***Usage: ${prefix}poll <topic>***`)
      return message.channel.send(usageEmbed);
    }

    message.delete();

    const pollEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`📥 | Poll`)
    .setDescription(args.join(" "))
    message.channel.send(pollEmbed)
    .then(message.react("📥"))
    .then(m => {
      m.react("👍");
      m.react("👎");
    });
  }

  module.exports.help = {
    name: "poll",
    aliases: [],
    category: "other"
}