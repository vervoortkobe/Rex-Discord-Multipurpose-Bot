const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/617087427428745286/CompletePotableDove-size_restricted.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087440053862460/DevotedDazzlingBarnowl-small.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087448538939402/giphy_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087456575094829/giphy_2.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087477089566745/giphy.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087491995992107/jamesvanderbeek_0.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087529220571156/pls8egF.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087549097115681/tenor_1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087579665203200/tenor.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617087588985208863/UjIb9DT.gif", "https://cdn.discordapp.com/attachments/601509635375104015/614910933973860373/cry.gif"];
    let result = Math.floor((Math.random() * replies.length));

    message.channel.send(`😭 | <@${message.author.id}> just started crying!`);

    const cryEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😭 | ${client.user.username} Cry`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(replies[result])
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(cryEmbed);
  }

  module.exports.help = {
    name: "cry"
}