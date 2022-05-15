const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

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
      .setAuthor(`⚙️ | Colorpicker`)
      .setDescription(`${x} **|** ***Usage: ${prefix}colorpicker <random/#ffffff>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    if(args[0] === "random") {
      let color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
      let colorimage = `https://tsunamiapi.tsunami2360.repl.co/color/?hex=${color}`;
      let hexedcolor = "#" + color;

      const colorpickerEmbed = new Discord.MessageEmbed()
      .setColor(hexedcolor)
      .setAuthor(`🎨 | Colorpicker`)
      .setDescription(`**» Hexadecimal:** \`${hexedcolor}\``)
      .setImage(colorimage)
      return message.channel.send({ embeds: [ colorpickerEmbed ]})
      .then(message.react("🎨"))
      .then(m => m.react("🔁"));
    }

    let color = args[0].replace("#", "").replace("0x", "");

    if(color.length > 6) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Colorpicker`)
      .setDescription(`${x} **|** ***Usage: ${prefix}colorpicker <random/#ffffff>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let colorimage = `https://tsunamiapi.tsunami2360.repl.co/color/?hex=${color}`;
    let hexedcolor = "#" + color;

    const colorpickerEmbed = new Discord.MessageEmbed()
    .setColor(hexedcolor)
    .setAuthor(`🎨 | Colorpicker`)
    .setDescription(`**» Hexadecimal:** \`${hexedcolor}\``)
    .setImage(colorimage)
    return message.channel.send({ embeds: [ colorpickerEmbed ]})
    .then(message.react("🎨"))
    .then(m => m.react("🔁"));
  }

  module.exports.help = {
    name: "colorpicker",
    aliases: ["color"],
    category: "other"
}