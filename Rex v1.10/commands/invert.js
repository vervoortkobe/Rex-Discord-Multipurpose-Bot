const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const invertPic = (`https://some-random-api.ml/beta/invert?avatar=${message.author.avatarURL}`);

    const invertEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`☻ | ${client.user.username} Invert`)
    .setImage(invertPic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(invertEmbed);
  }

  module.exports.help = {
    name: "invert"
}