const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const supportserverEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | Check ${client.user.username} Api!`)
    .setDescription(`[status.hostvalues.eu](http://rexbot.ga/api)`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    message.channel.send(supportserverEmbed);
  }

  module.exports.help = {
    name: "api"
}