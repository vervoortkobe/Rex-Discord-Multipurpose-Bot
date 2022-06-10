const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);
    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/622502231366696970/slap.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088757216313364/4e9ea150354ad3159339b202cbc6cad9.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088787880738816/CaringFloweryKentrosaurus-small.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088791441571840/giphy_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088807959003159/giphy.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088807883505670/46b0a213e3ea1a9c6fcc060af6843a0e.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088817341399042/Li9mx3A.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088825281216513/o2SJYUS.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088860010053633/source_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088871590789120/source.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088888967528472/tenor_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088901978259467/tenor_2.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088942105427999/tenor.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088944797908995/tenor_3.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088955216560148/tumblr_lz6w8dylsT1qfgo1to1_500.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088965920555128/tumblr_mt7zwazvyi1rqfhi2o1_400.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088981703721031/tumblr_phizajqDcb1wj1nn0o1_400.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088988993421433/VW0cOyL.gif", "https://cdn.discordapp.com/attachments/601509635375104015/614908280141119496/slap.gif"];
    let result = Math.floor((Math.random() * replies.length));
    
    if (!memberToFind) {
      return message.channel.send(`❌ | Pls mention a valid member of this server!`);
    }

    message.channel.send(`😵 | <@${message.author.id}> just slapped <@${memberToFind.user.id}>!`);

    const slapEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😵 | ${client.user.username} Slap`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(replies[result])
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(slapEmbed);
  }

  module.exports.help = {
    name: "slap"
}  
