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

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Tictactoe`)
      .setDescription(`${x} **|** ***Usage: ${prefix}tictactoe <@member/member ID>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }
  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    const tictactoe = require("../tictactoe/tictactoe.js");
    new tictactoe({
      message: message,
      player_two: member
    });

  }

  module.exports.help = {
    name: "tictactoe",
    aliases: ["ttt"],
    category: "fun"
}