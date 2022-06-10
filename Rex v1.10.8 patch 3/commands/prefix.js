const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args, prefix) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`❌ | Couldn't change my prefix, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    if(!args[0] || !args[1]) {
      const prefixUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Prefix`)
      .setDescription(`Usage: **r.prefix set <new prefix>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(prefixUsageEmbed);
    }

    if(args[0] === `set`) {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

    prefixes[message.guild.id] = {
        prefixes: args[1]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(err)
    });

    const prefixEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Prefix`)
    .setDescription(`✅ | My prefix has been set to: **${args[1]}**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(prefixEmbed);
    }

    const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const prefixLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`CONFIG_PREFIX`, `My prefix has been set to: **${args[1]}**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(prefixLogEmbed);
  }

  module.exports.help = {
    name: "prefix"
}