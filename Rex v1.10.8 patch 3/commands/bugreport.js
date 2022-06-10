const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let bug = args.join(' ');

    if(!bug) {
      const bugreportUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Bugreport`)
      .setDescription(`Usage: **${prefix}bugreport <bug>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(bugreportUsageEmbed)
    }

    const bugreportChannel = client.guilds.find(g => g.id === `516227189251768330`).channels.find(c => c.name === bugreports);
    if(!bugreportChannel) return message.channel.send(`❌ | I couldn't submit your bugreport, because there is no bugreports channel! Pls create a bugreports channel!`);

    const bugreportEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚠️ | ${client.user.username} Bugreport`)
    .addField(`Bug`, bug)
    .addField(`Reported By`, `<@${message.author.tag}>`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    reportChannel.send(bugreportEmbed);

    message.delete();

    message.channel.send(`✅ | Your bugreport has been sent successfully to <#${516227189251768330}>!`);

    const bugreportDmEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚠️ | ${client.user.username} Bugreport`)
    .setDescription(`**This is the bugreport you just sent!**`)
    .addField(`Bug`, bug)
    .addField(`Reported By`, `<@${message.author.id}>`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.author.send(bugreportDmEmbed);
  }

  module.exports.help = {
    name: "bugreport"
}