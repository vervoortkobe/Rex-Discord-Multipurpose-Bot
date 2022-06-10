const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`❌ | Couldn't create a join-leave channel, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    message.guild.createChannel(`join-leave`, "text").then(c => {
        let role = message.guild.roles.find(r => r.name === "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: false,
            READ_MESSAGES: true
        });
        message.channel.send(`✅ | The join-leave channel has been created: <#${c.id}>!`);
    }
  )}

  module.exports.help = {
    name: "joinleave"
}