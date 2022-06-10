const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
  
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`❌ | Couldn't create the join-leave channel, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);
    if(message.guild.channels.exists("name", "join-leave")) return message.channel.send(`❌ | Couldn't create the join-leave channel, because it is already created!`);

    message.guild.createChannel(`join-leave`, "text").then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: false,
            READ_MESSAGES: true
        });
    message.channel.send(`✅ | The join-leave channel has been created: <#${c.id}>!\n**⚠️ | Warning: Do not change the join-leave channels' name, otherwise the join-leave module wont work anymore!**`);
    })
  }

  module.exports.help = {
    name: "joinleave"
}