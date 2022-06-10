const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");

module.exports.run = async (client, message, args, prefix) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`❌ | Couldn't change my prefix, because you do not have the correct permission (ADMINISTRATOR) to do this!`);
    if(!args[0]) {
      const prefixUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Prefix`)
      .setDescription(`Usage: **${prefix}prefix <new prefix>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(prefixUsageEmbed);
    }

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(err)
    });

    const prefixEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Prefix`)
    .setDescription(`✅ | Prefix was set to: **${args[0]}**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(prefixEmbed);
  }

  module.exports.help = {
    name: "prefix"
}