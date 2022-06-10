const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const voteEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Vote`)
    .addField(`Vote`, `Vote for ${client.user.username} on idiscord.pro(https://idiscord.pro/bots/605385562152763395/vote)`)
    .addField(`Discord Bot List`, `[Check ${client.user.username} on idiscord.pro](https://idiscord.pro/bots/605385562152763395)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(voteEmbed);
  }

  module.exports.help = {
    name: "vote"
}