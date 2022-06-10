const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const inviteEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | Add ${client.user.username} to your own Discord server!`)
    .setDescription(`[Invite ${client.user.username}](http://rexbot.ga/invite)`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(inviteEmbed);
  }

  module.exports.help = {
    name: "invite"
}