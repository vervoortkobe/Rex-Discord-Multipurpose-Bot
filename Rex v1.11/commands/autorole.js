const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args, prefix) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`❌ | Couldn't add the autorole, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    if(!args[0] || !args[1]) {
      const autoroleUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Autorole`)
      .setDescription(`Usage: **r.autorole set <role ID>**`)
      .addField(`⚠️ | Warning`, `<role ID> HAS TO BE AN ID, MENTIONING THE ROLE WON'T WORK!!!`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(autoroleUsageEmbed);
    }

    if(args[0] === `set`) {

    let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf-8"));

    autoroles[message.guild.id] = {
        autoroles: args[1]
    };

    fs.writeFile("./autoroles.json", JSON.stringify(autoroles), (err) => {
      if (err) console.log(err)
    });

    const autoroleEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Autorole`)
    .setDescription(`✅ | The autorole has been set to: **<@&${args[1]}>**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(autoroleEmbed);
    }

    const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const autoroleLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`CONFIG_AUTOROLE`, `The autorole has been set to: **<@&${args[1]}>**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(autoroleLogEmbed);
  }

  module.exports.help = {
    name: "autorole"
}