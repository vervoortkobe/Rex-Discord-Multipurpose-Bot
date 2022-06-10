const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

const {Attachment} = require('discord.js');

module.exports.run = async (client, message, args) => {
  
    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
      if(!member) {
        member = message.author
      }
    const spinPic = new Attachment(`https://some-random-api.ml/beta/spin?avatar=${member.displayAvatarURL}`, 'spin.gif');

    const spinEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🔄 | ${client.user.username} Spin`)
    .attachFile(spinPic)
    .setImage('attachment://spin.gif')
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(spinEmbed);
  }

  module.exports.help = {
    name: "spin"
}