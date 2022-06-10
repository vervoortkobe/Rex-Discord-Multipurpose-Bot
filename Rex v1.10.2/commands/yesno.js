const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    if(!args[0]){
      const yesnoUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`✅❌ | ${client.user.username} Yes No`)
      .setDescription(`Usage: **${prefix}yesno <poll/suggestion>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(yesnoUsageEmbed);
    }

    message.react('✅').then(() => { 
      message.react('❌')});
  }

  module.exports.help = {
    name: "yesno"
}
