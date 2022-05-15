const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Slap`)
      .setDescription(`${x} **|** ***Usage: ${prefix}slap <@member/member ID>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
    
    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/622502231366696970/slap.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088757216313364/4e9ea150354ad3159339b202cbc6cad9.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088787880738816/CaringFloweryKentrosaurus-small.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088791441571840/giphy_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088807959003159/giphy.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088807883505670/46b0a213e3ea1a9c6fcc060af6843a0e.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088817341399042/Li9mx3A.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088825281216513/o2SJYUS.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088860010053633/source_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088871590789120/source.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088888967528472/tenor_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088901978259467/tenor_2.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088942105427999/tenor.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088944797908995/tenor_3.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088955216560148/tumblr_lz6w8dylsT1qfgo1to1_500.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088965920555128/tumblr_mt7zwazvyi1rqfhi2o1_400.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088981703721031/tumblr_phizajqDcb1wj1nn0o1_400.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617088988993421433/VW0cOyL.gif", "https://cdn.discordapp.com/attachments/601509635375104015/614908280141119496/slap.gif"];
    let result = Math.floor((Math.random() * replies.length));

    message.channel.send(`😵 | ${message.author} slapped ${member}!`);

    const slapEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`😵 | Slap`)
    .setImage(replies[result])
    message.channel.send({ embeds: [ slapEmbed ]})
    .then(message.react("😵"));
  }

  module.exports.help = {
    name: "slap",
    aliases: [],
    category: "imgs"
}  
