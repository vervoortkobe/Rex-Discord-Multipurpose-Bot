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

    let input = message.content.split(" ").slice(2).join(" ");

    if(!args[0] || !input) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Binary`)
      .setDescription(`${x} **|** ***Usage: ${prefix}binary <enc/dec> <input>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    if(args[0] === `enc`) {

        fetch(`https://some-random-api.ml/binary?text=${input}`)
        .then(res => res.json()).then(data => {
          if(!data.binary) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
            return message.channel.send({ embeds: [ errorEmbed ]});
          }

        const encbinaryEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🖥️ | Binary Encode`)
        .setDescription(`**» Input Text:**\n\`\`\`${input}\`\`\`\n**» Output Binary:**\n\`\`\`${data.binary}\`\`\``)
        message.channel.send({ embeds: [ encbinaryEmbed ]})
        .then(message.react("🖥️"));
      });
    }

    if(args[0] === `dec`) {

        fetch(`https://some-random-api.ml/binary/?decode=${input}`)
        .then(res => res.json()).then(data => {
          if(!data.text) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
            return message.channel.send({ embeds: [ errorEmbed ]});
          }
  
        const decbinaryEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🖥️ | Binary Deccode`)
        .setDescription(`**» Input Binary:**\n\`\`\`${input}\`\`\`\n**» Output Text:**\n\`\`\`${data.text}\`\`\``)
        message.channel.send({ embeds: [ decbinaryEmbed ]})
        .then(message.react("🖥️"));
      });
    }
  }

  module.exports.help = {
    name: "binary",
    aliases: [],
    category: "fun"
}