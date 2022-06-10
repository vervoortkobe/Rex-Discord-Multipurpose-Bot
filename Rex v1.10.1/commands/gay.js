const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
  
    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
      if(!member) {
        member = message.author
      }
    const gayPic = (`https://some-random-api.ml/beta/gay?avatar=${member.avatarURL}`);

    const gayEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🏳️‍🌈 | ${client.user.username} Gay`)
    .setImage(gayPic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(gayEmbed);
  }

  module.exports.help = {
    name: "gay"
}