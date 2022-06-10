const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let wbUsername = args.join(' ');

    if(message.author.id === '404289224761016332') {
      message.channel.createWebhook(`${wbUsername}`, `https://cdn.discordapp.com/attachments/614912483865526275/636652615236845568/322c936a8c8be1b803cd94861bdfa868.png`)
      .then(wb => message.author.send(`✅ | You created a webhook in ${message.guild.name}, ${message.channel.name}.\n__**\`${wbUsername}\`**__\n\`https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}\``));
    
    } else {

    return message.channel.send(`❌ | Couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`);
    }
  }

  module.exports.help = {
    name: "webhook"
}