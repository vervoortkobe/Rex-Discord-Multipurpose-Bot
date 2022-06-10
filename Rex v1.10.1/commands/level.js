const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let lvl = require("../lvl.json");

    if(!lvl[message.author.id]) {
        lvl[message.author.id] = {
            lvl: 0
        };
      }

    let uLvl = lvl[message.author.id].lvl;

    let lvlEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🆙 | ${client.user.username} Level`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`You are **lvl ${uLvl}**!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(lvlEmbed);
  }

  module.exports.help = {
    name: "level"
}