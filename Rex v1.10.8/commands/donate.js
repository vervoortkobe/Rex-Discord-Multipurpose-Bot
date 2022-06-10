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
    .setDescription(`To donate to ${client.user.username} and get your donator perks, you have to join the [Support Server](http://rexbot.ga/support) and create a ticket in there (\`r.new\` or \`r.ticket\`). Then confirm that it is you who donated. Now you will get **2x xp** and the **=DONATOR= rank** in the Support Server!`)
    .addField(`PayPal Donation Link`, `[Donate](http://rexbot.ga/donate)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(donateEmbed);
  }

  module.exports.help = {
    name: "donate"
}