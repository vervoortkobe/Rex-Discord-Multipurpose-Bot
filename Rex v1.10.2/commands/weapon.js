const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const weaponPic = ("https://cdn.discordapp.com/attachments/614912483865526275/630149548915949568/scrn-1.gif");

    const weaponEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🔫 | ${client.user.username} Weapon`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`Screenshot to know you weapon!`)
    .setImage(weaponPic)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(weaponEmbed);
  }

  module.exports.help = {
    name: "weapon"
}