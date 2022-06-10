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
    const wastedPic = (`https://some-random-api.ml/beta/wasted?avatar=${member.avatarURL}`);

    const wastedEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`👮 | ${client.user.username} Wasted`)
    .setImage(wastedPic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(wastedEmbed);
  }

  module.exports.help = {
    name: "wasted"
}