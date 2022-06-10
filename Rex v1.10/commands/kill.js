const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);
    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/614913857223131146/kill.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617085383607451653/2740e543d6e8e11ecc8e11a374cb1085.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617085396026916904/anime-kill-gif.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617086222069792816/tenor.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617086236565307420/tenor_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617086256039329802/ImprobableDistinctArachnid-size_restricted.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617086268169388063/AdoredJampackedAmericanavocet-size_restricted.gif"];
    let result = Math.floor((Math.random() * replies.length));

    if (!memberToFind) {
      return message.channel.send(`❌ | Pls mention a valid member of this server!`);
    }

    message.channel.send(`🔪 | <@${message.author.id}> just killed <@${memberToFind.user.id}>!`);

    const killEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🔪 | ${client.user.username} Kill`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(replies[result])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(killEmbed);
  }

  module.exports.help = {
    name: "kill"
}