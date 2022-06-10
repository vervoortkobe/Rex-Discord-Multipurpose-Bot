const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`❌ | Couldn't create a logs channel, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);
      message.guild.createChannel(`rex-logs`, "text").then(c => {
        let role = message.guild.roles.find(r => r.name === "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        message.channel.send(`✅ | The logs channel has been created: <#${c.id}>!`);
    }
  )}

  module.exports.help = {
    name: "logs"
}