const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const supportserverEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | Visit ${client.user.username} Site!`)
    .setDescription(`[rexbot.ga](http://rexbot.ga)`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    message.channel.send(supportserverEmbed);
  }

  module.exports.help = {
    name: "site"
}