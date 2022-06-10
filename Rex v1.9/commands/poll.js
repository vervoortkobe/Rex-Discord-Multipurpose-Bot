const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    if(!args[0]){
      const pollUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`👍👎 | ${client.user.username} Poll`)
      .setDescription(`Usage: **${prefix}poll <poll/suggestion>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(pollUsageEmbed);
    }

    message.react('👍').then(() => { 
      message.react('👎')});
  }

  module.exports.help = {
    name: "poll"
}