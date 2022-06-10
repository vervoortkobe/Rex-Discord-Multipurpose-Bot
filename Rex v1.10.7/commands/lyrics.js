const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let song = encodeURIComponent(args.join(' '));
    let {data} = await fetch;

    fetch(`https://some-random-api.ml/lyrics?title=${song}`)
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    if(!song[0]) {
        const lyricsUsageEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`⚙️ | ${client.user.username} Lyrics`)
        .setDescription(`Usage: **${prefix}lyrics <song title>**`)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        message.channel.send(lyricsUsageEmbed);
    }

    if(data.lyrics.length > "1990") return message.channel.send(`❌ | Couldn't fetch the song its lyrics, because it contains more than 2000 symbols!`);

    const lyrics = (`__**🎶 | ${client.user.username} Lyrics**__\n\`\`\`yaml\n${data.title} - ${data.author}\`\`\`\n\`\`\`${data.lyrics}\`\`\``);
    message.channel.send(lyrics);
    })
  }

  module.exports.help = {
    name: "lyrics"
}