const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const greyscalePic = (`https://some-random-api.ml/beta/greyscale?avatar=${message.author.avatarURL}`);

    const greyscaleEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`☻ | ${client.user.username} Greyscale`)
    .setImage(greyscalePic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(greyscaleEmbed);
  }

  module.exports.help = {
    name: "greyscale"
}