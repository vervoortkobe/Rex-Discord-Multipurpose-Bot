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

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const botstatsEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`📊 | Botstats`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**» Cached Servers:** \`${client.guilds.cache.size}\`\n**» Cached Users:** \`${client.users.cache.size}\`\n**» Uptime:** \`${uptime}\``)
    message.channel.send(botstatsEmbed)
    .then(message.react("📊"));
  }

  module.exports.help = {
    name: "botstats",
    aliases: [],
    category: "about"
}