const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    const supportserverEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | Join ${client.user.username} Support Server!`)
    .setDescription(`[Join Support Server](http://rexbot.ga/supportserver)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(supportserverEmbed);
  }

  module.exports.help = {
    name: "supportserver"
}