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
    const triggerPic = new Attachment(`https://some-random-api.ml/beta/triggered?avatar=${member.displayAvatarURL}`, 'trigger.gif');

    const triggerEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😤 | ${client.user.username} Trigger`)
    .attachFile(triggerPic)
    .setImage('attachment://trigger.gif')
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(triggerEmbed);
  }

  module.exports.help = {
    name: "trigger"
}