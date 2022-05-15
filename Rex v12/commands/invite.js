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

    const inviteEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setAuthor(`🤖 | Invite`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**»** You can invite ${client.user.username} to your own Discord server **[here](https://rexbot.ga/invite)**!`)
    message.channel.send(inviteEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "invite",
    aliases: [],
    category: "about"
}