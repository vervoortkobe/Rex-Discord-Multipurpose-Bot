const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const triggerPic = (`https://some-random-api.ml/beta/triggered?avatar=${message.author.avatarURL}`);

    const triggerEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😤 | ${client.user.username} Trigger`)
    .setImage(triggerPic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(triggerEmbed);
  }

  module.exports.help = {
    name: "trigger"
}