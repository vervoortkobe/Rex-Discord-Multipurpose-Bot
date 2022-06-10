const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const donateEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`💸 | ${client.user.username} Donate`)
    .setDescription(`To donate to ${client.user.username}, you have to join the [Support Server](http://rexbot.ga/support) and create a ticket in there (\`r.new\` or \`r.ticket\`). Then ask for the donate link and send proof that you donated in the ticket. Now you will get **double lvl xp** and the **=DONATOR= rank** in the Support Server!\n⚠️ | WARNING: You can only donate using Paypal!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(donateEmbed);
  }

  module.exports.help = {
    name: "donate"
}