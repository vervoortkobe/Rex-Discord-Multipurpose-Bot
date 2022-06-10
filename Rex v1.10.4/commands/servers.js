const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.author.id == `578507623360626688`) return message.channel.send(`❌ | Couldn't show the serverlist, because you do not have the correct permission to do this!`)
    
    let serverlist = ''
      client.guilds.forEach((guild) => {
          serverlist = serverlist.concat(`__**${client.user.username} Serverlist**__\n\`${guild.name}\``)
      })
    message.channel.send(serverlist)
  }
  
  module.exports.help = {
    name: "servers"
}