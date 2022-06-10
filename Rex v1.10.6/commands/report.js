const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let username = args[0];
    let proof = args[1];
    let reason = message.content.split(" ").slice(3).join(" ");

    if(!username || !proof || !reason) {
      const reportUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Report`)
      .setDescription(`Usage: **${prefix}report <username#tag> <proof (e.g. an img link)> <reason>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(reportUsageEmbed)
    }

    const reportChannel = message.guild.channels.find(c => c.name === `rex-reports`);
    if(!reportChannel) return message.channel.send(`❌ | I couldn't submit your report, because there is no reports channel. Pls create a reports channel with this command: \`${prefix}rex-reports\`!`);

    const reportEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚠️ | ${client.user.username} Report`)
    .addField(`Username`, username)
    .addField(`Proof`, proof)
    .addField(`Reason`, reason)
    .addField(`Reported By`, `<@${message.author.id}>`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    reportChannel.send(reportEmbed);

    message.delete();
    message.channel.send(`✅ | Your report has been sent successfully! Pls be patient while the Staff team takes a look at it.`);

    const reportDmEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚠️ | ${client.user.username} Report`)
    .setDescription(`**This is the report you just sent!**`)
    .addField(`Username`, username)
    .addField(`Proof`, proof)
    .addField(`Reason`, reason)
    .addField(`Reported By`, `<@${message.author.id}>`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.author.send(reportDmEmbed);
  }

  module.exports.help = {
    name: "report"
}