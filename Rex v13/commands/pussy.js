const Discord = require("discord.js");
const fs = require("fs");
const superagent = require("superagent");

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

    if (message.channel.nsfw === true) {
      superagent.get("https://nekobot.xyz/api/image")
      .query({ type: 'pussy' })
      .end((err, response) => {
        message.channel.send({ files: [response.body.message] });
      });
    } else {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't return nsfw content, because this isn't an nsfw channel!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
  }

  module.exports.help = {
    name: "pussy",
    aliases: [],
    category: "nsfw"
}