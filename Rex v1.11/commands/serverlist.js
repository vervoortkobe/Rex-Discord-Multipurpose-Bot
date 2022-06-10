const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(message.author.id == `408289224761016332`) {
    
    let servers = ''
      client.guilds.forEach((guild) => {
          servers = servers.concat(`\n\`${guild.name}\``)
      })

    const serverlistEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Serverlist`)
    .addField(`Servers (${client.guilds.size})`, servers)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(serverlistEmbed);

  } else {

    return message.channel.send(`❌ | Couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`)
    }
  }

  
  module.exports.help = {
    name: "serverlist"
}