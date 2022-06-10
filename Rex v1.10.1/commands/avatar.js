const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!memberToFind) {
      memberToFind = message.author
      }

    const avatarEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Avatar`)
    .setImage(memberToFind.avatarURL)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
  message.channel.send(avatarEmbed);
  }

  module.exports.help = {
    name: "avatar"
}