const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    if(!args[0]){
      const thumbsUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Thumbs`)
      .setDescription(`Usage: ${prefix}thumbs <poll/suggestion>`)
      .setFooter(`© Rex was made by Tsunami#6271`)
      message.channel.send(thumbsUsageEmbed);
    }

    message.react('👍').then(() => { 
      message.react('👎')});
  }

  module.exports.help = {
    name: "thumbs"
}