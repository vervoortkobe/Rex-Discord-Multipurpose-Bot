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

    const servericonEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🖼️ | Servericon`)
    .setDescription(`**Servericon of** \`${message.guild.name}\``)
    .setImage(message.guild.iconURL())
    message.channel.send(servericonEmbed)
    .then(message.react("🖼️"));
  }

  module.exports.help = {
    name: "servericon",
    aliases: [],
    category: "other"
}