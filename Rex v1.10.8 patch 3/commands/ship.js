const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
 
    if (!member) return message.channel.send(`❌ | Pls mention a valid member of this server.`);

    let replies = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"];
    let result = Math.floor((Math.random() * replies.length));

    if (message.author.id === `302907024780296193` && member.user.id === `558667234776711179`) {
      const dadBradShipEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`❤️ | ${client.user.username} Ship`)
      .setDescription(`<@${message.author.id}> ❤️ <@${member.user.id}> for \`101%\`!`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(dadBradShipEmbed)

      } else {

      const shipEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`❤️ | ${client.user.username} Ship`)
      .setDescription(`<@${message.author.id}> ❤️ <@${member.user.id}> for \`${replies[result]}%\`!`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(shipEmbed)
    }
  }

  module.exports.help = {
    name: "ship"
}