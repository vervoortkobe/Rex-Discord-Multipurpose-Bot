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

    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/617087427428745286/CompletePotableDove-size_restricted.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087440053862460/DevotedDazzlingBarnowl-small.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087448538939402/giphy_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087456575094829/giphy_2.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087477089566745/giphy.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087491995992107/jamesvanderbeek_0.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087529220571156/Please8egF.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087549097115681/tenor_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087579665203200/tenor.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087588985208863/UjIb9DT.gif", "https://cdn.discordapp.com/attachments/601509635375104015/614910933973860373/cry.gif"];
    let result = Math.floor((Math.random() * replies.length));

    message.channel.send(`😭 | ${message.author} started crying!`);

    const cryEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`😭 | Cry`)
    .setImage(replies[result])
    message.channel.send({ embeds: [ cryEmbed ]})
    .then(message.react("😭"));
  }

  module.exports.help = {
    name: "cry",
    aliases: [],
    category: "imgs"
}