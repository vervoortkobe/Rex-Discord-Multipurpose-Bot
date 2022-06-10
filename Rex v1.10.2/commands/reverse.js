const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);
    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/633023096005197824/reversecardcolours.gif", "https://cdn.discordapp.com/attachments/614912483865526275/619987718008733706/Knipsel.PNG", "https://cdn.discordapp.com/attachments/614912483865526275/619987709976510484/tenor.gif", "https://cdn.discordapp.com/attachments/614912483865526275/619987661989478420/tumblr_pshl5wq4zO1vxgjheo3_250.png", "https://cdn.discordapp.com/attachments/614912483865526275/619987659414044703/41fd20fb8090b5c00f29717c935a356f.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/619987655966588979/tumblr_pshl5wq4zO1vxgjheo1_250.png", "https://cdn.discordapp.com/attachments/614912483865526275/619987600945446913/images.png", "https://cdn.discordapp.com/attachments/614912483865526275/619987593601351691/images.jpg"];
    let result = Math.floor((Math.random() * replies.length));

    if (!memberToFind) {
      return message.channel.send(`❌ | Pls mention a valid member of this server!`);
    }

    message.channel.send(`🔄 | <@${message.author.id}> just reversed <@${memberToFind.user.id}>'s action!`);

    const reverseEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🔄 | ${client.user.username} Reverse`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(replies[result])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(reverseEmbed);
  }

  module.exports.help = {
    name: "reverse"
}