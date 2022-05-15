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
    
    const supportEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🤖 | Support Server`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**»** Join the official Discord Support Server of the ${client.user.username} Discord bot **[here](https://rexbot.ga/discord)**!`)
    message.channel.send(supportEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "support",
    aliases: ["discord", "supportserver", "server"],
    category: "about"
  }