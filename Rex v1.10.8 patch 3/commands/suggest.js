const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let suggestion = args.join(' ');

    if(!suggestion) {
      const suggestUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Suggest`)
      .setDescription(`Usage: **${prefix}suggest <suggestion>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(suggestUsageEmbed)
    }

    const suggestionsChannel = client.guilds.find(g => g.id === `516227189251768330`).channels.find(c => c.name === `suggestions`);
    if(!suggestionsChannel) return message.channel.send(`❌ | I couldn't submit your suggestion, because there is no suggestions channel! Pls create a suggestions channel!`);

    const suggestEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚠️ | ${client.user.username} Suggest`)
    .addField(`Suggestion`, suggestion)
    .addField(`Suggested By`, message.author.username)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    suggestionsChannel.send({embed: suggestEmbed}).then(embedMessage => {
      embedMessage.react('👍').then(() => { 
        embedMessage.react('👎')});
    })

    message.delete();

    message.channel.send(`✅ | Your suggestion has been sent successfully to <#${621336485571985422}>!`);

    const suggestDmEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚠️ | ${client.user.username} Suggest`)
    .setDescription(`**This is the suggestion you just sent!**`)
    .addField(`Suggestion`, suggestion)
    .addField(`Suggested By`, `<@${message.author.id}>`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.author.send(suggestDmEmbed);
  }

  module.exports.help = {
    name: "suggest"
}