const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);
    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/632231976052588563/image0.png", "https://cdn.discordapp.com/attachments/614912483865526275/622502252673892373/shoot2.gif", "https://cdn.discordapp.com/attachments/614912483865526275/622502244679548929/shoot.gif", "https://cdn.discordapp.com/attachments/601509635375104015/614908306028494878/shoot.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617082281273851929/giphy_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617082947127869482/1e17c4368b75652535b90b98bd3b6c0c.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617082955248173076/7e9f44408e1dd64b8423e5389bf5d041579dbf69_hq.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617082966241312800/82631879.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617082976198721537/giphy_2.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617083003574681610/giphy.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617083018988879872/source.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617083034373455872/tenor_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617083058448760874/tenor.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617083067202404361/tumblr_349bad0a5a6b224bc6c3618f1e81739d_8ec04e8d_400.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617083095589322774/tumblr_m8m5sz6izo1r2ajbko1_r1_400.gif", "https://tenor.com/view/baby-driver-movie-baby-driver-baby-driver-gifs-jon-hamm-eiza-gonzalez-gif-8501729", "https://cdn.discordapp.com/attachments/614912483865526275/617086686962122868/AdoredJampackedAmericanavocet-size_restricted.gif"];
    let result = Math.floor((Math.random() * replies.length));

    if (!memberToFind) {
      memberToFind = message.author
      }

    message.channel.send(`🔫 | <@${message.author.id}> just shot <@${memberToFind.id}>!`);

    const shootEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🔫 | ${client.user.username} Shoot`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(replies[result])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(shootEmbed);
  }

  module.exports.help = {
    name: "shoot"
}