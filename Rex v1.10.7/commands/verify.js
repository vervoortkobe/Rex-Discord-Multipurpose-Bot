const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
  
    const verifyRole = message.guild.roles.find(r => r.name === `Verified`);
      if(!verifyRole) return message.channel.send(`❌ | Couldn't verify you, because the owner of this server doesn't want this command to be setup or forgot to setup this command! To do this, pls create a \`Verified\` role.`);
      if(message.author.roles.has(verifyRole)) return message.channel.send(`❌ | Couldn't verify you, because you are already verified!`);

    message.author.addRole(verifyRole);
    message.channel.send(`✅ | <@${message.author.id}> just got successfully verified!`)
  }

  module.exports.help = {
    name: "verify"
}