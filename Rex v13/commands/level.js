const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");

module.exports.run = async (client, message, args) => {

    //RANKONLB 20+
    let differarr = [];
    message.guild.members.cache.forEach(user => {
      differarr.push(user.id);
    });

    let allmemberlength = differarr.length;

    let mesarr = [];

    for(let i = 0; i < allmemberlength; i++) {
      let gettheamount = levels[differarr[i]];

      let theamount;
      if(gettheamount) {
        theamount = gettheamount.xp;
      } else {
        theamount = "0";
      }

      mesarr.push({
        name: differarr[i],
        amount: theamount
      });
    }

    mesarr.sort((a, b) => b.amount - a.amount);

    if(args[0]) {

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!member) {
  
        var rankonlb;
        if(mesarr[0].name === args[0]) rankonlb = "1st";
        else if(mesarr[1].name === args[0]) rankonlb = "2nd";
        else if(mesarr[2].name === args[0]) rankonlb = "3rd";
        else if(mesarr[3].name === args[0]) rankonlb = "4th";
        else if(mesarr[4].name === args[0]) rankonlb = "5th";
        else if(mesarr[5].name === args[0]) rankonlb = "6th";
        else if(mesarr[6].name === args[0]) rankonlb = "7th";
        else if(mesarr[7].name === args[0]) rankonlb = "8th";
        else if(mesarr[8].name === args[0]) rankonlb = "9th";
        else if(mesarr[9].name === args[0]) rankonlb = "10th";
        else if(mesarr[10].name === args[0]) rankonlb = "11th";
        else if(mesarr[11].name === args[0]) rankonlb = "12th";
        else if(mesarr[12].name === args[0]) rankonlb = "13th";
        else if(mesarr[13].name === args[0]) rankonlb = "14th";
        else if(mesarr[14].name === args[0]) rankonlb = "15th";
        else if(mesarr[15].name === args[0]) rankonlb = "16th";
        else if(mesarr[16].name === args[0]) rankonlb = "17th";
        else if(mesarr[17].name === args[0]) rankonlb = "18th";
        else if(mesarr[18].name === args[0]) rankonlb = "19th";
        else if(mesarr[19].name === args[0]) rankonlb = "20th";
        else rankonlb = "20+";
  
        let xp = levels[args[0]].xp;
  
        var lvl;
        if(!xp || xp >= 0 && xp < 1000) lvl = 0;
        if(xp >= 1000 && xp < 2000) lvl = 1;
        if(xp >= 2000 && xp < 3000) lvl = 2;
        if(xp >= 3000 && xp < 4000) lvl = 3;
        if(xp >= 4000 && xp < 5000) lvl = 4;
        if(xp >= 5000 && xp < 6000) lvl = 5;
        if(xp >= 6000 && xp < 7000) lvl = 6;
        if(xp >= 7000 && xp < 8000) lvl = 7;
        if(xp >= 8000 && xp < 9000) lvl = 8;
        if(xp >= 9000 && xp < 10000) lvl = 9;
        if(xp >= 10000 && xp < 11000) lvl = 10;

        let replies = ["https://cdn.discordapp.com/embed/avatars/0.png", "https://cdn.discordapp.com/embed/avatars/1.png", "https://cdn.discordapp.com/embed/avatars/2.png", "https://cdn.discordapp.com/embed/avatars/3.png", "https://cdn.discordapp.com/embed/avatars/4.png", "https://cdn.discordapp.com/embed/avatars/5.png"]
        let result = Math.floor(Math.random() * replies.length);
  
        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20${lvl}&username=${args[0]}&discriminator=0001&subtext=${xp}/${lvl + 1}000%20xp&avatar=${replies[result]}`)
        .then(res => res).then(data => {
          if(data.error) {

            const lvlEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level`)
            .setThumbnail(replies[result])
            .setDescription(`\`${args[0]}\` is lvl \`${lvl}\`, has \`${xp}\` xp and is \`${rankonlb}\` on the leaderboard!\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/${lvl + 1}000\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard`)
            return message.channel.send({ embeds: [ lvlEmbed ]})
            .then(message.react("🆙"));

          } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20${lvl}&username=${args[0]}&discriminator=0001&subtext=${xp}/${lvl + 1}000%20xp&avatar=${replies[result]}`, "level.png");

            const lvlEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level`)
            .setDescription(`\`${args[0]}\` is lvl \`${lvl}\`, has \`${xp}\` xp and is \`${rankonlb}\` on the leaderboard!\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/${lvl + 1}000\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard`)
            .setImage("attachment://level.png")
            return message.channel.send({ embeds: [ lvlEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
          }
        });
      }
  
      var rankonlb;
      if(mesarr[0].name === member.id) rankonlb = "1st";
      else if(mesarr[1].name === member.id) rankonlb = "2nd";
      else if(mesarr[2].name === member.id) rankonlb = "3rd";
      else if(mesarr[3].name === member.id) rankonlb = "4th";
      else if(mesarr[4].name === member.id) rankonlb = "5th";
      else if(mesarr[5].name === member.id) rankonlb = "6th";
      else if(mesarr[6].name === member.id) rankonlb = "7th";
      else if(mesarr[7].name === member.id) rankonlb = "8th";
      else if(mesarr[8].name === member.id) rankonlb = "9th";
      else if(mesarr[9].name === member.id) rankonlb = "10th";
      else if(mesarr[10].name === member.id) rankonlb = "11th";
      else if(mesarr[11].name === member.id) rankonlb = "12th";
      else if(mesarr[12].name === member.id) rankonlb = "13th";
      else if(mesarr[13].name === member.id) rankonlb = "14th";
      else if(mesarr[14].name === member.id) rankonlb = "15th";
      else if(mesarr[15].name === member.id) rankonlb = "16th";
      else if(mesarr[16].name === member.id) rankonlb = "17th";
      else if(mesarr[17].name === member.id) rankonlb = "18th";
      else if(mesarr[18].name === member.id) rankonlb = "19th";
      else if(mesarr[19].name === member.id) rankonlb = "20th";
      else rankonlb = "20+";
  
      let xp = levels[member.id].xp;
  
      var lvl;
      if(!xp || xp >= 0 && xp < 1000) lvl = 0;
      if(xp >= 1000 && xp < 2000) lvl = 1;
      if(xp >= 2000 && xp < 3000) lvl = 2;
      if(xp >= 3000 && xp < 4000) lvl = 3;
      if(xp >= 4000 && xp < 5000) lvl = 4;
      if(xp >= 5000 && xp < 6000) lvl = 5;
      if(xp >= 6000 && xp < 7000) lvl = 6;
      if(xp >= 7000 && xp < 8000) lvl = 7;
      if(xp >= 8000 && xp < 9000) lvl = 8;
      if(xp >= 9000 && xp < 10000) lvl = 9;
      if(xp >= 10000 && xp < 11000) lvl = 10;

      let {data} = await fetch;

      fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20${lvl}&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${xp}/${lvl + 1}000%20xp&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`)
      .then(res => res).then(data => {
        if(data.error) {

          const lvlEmbed = new Discord.MessageEmbed()
          .setColor(0xffb900)
          .setAuthor(`🆙 | Level`)
          .setThumbnail(member.user.displayAvatarURL())
          .setDescription(`${member} is lvl \`${lvl}\`, has \`${xp}\` xp and is \`${rankonlb}\` on the leaderboard!\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/${lvl + 1}000\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard`)
          message.channel.send({ embeds: [ lvlEmbed ]})
          .then(message.react("🆙"));

        } else {
  
          let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20${lvl}&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${xp}/${lvl + 1}000%20xp&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

          const lvlEmbed = new Discord.MessageEmbed()
          .setColor(0xffb900)
          .setAuthor(`🆙 | Level`)
          .setDescription(`${member} is lvl \`${lvl}\`, has \`${xp}\` xp and is \`${rankonlb}\` on the leaderboard!\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/${lvl + 1}000\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard`)
          .setImage("attachment://level.png")
          message.channel.send({ embeds: [ lvlEmbed ], files: [ levelpic ]})
          .then(message.react("🆙"));
        }
      });
    }

    var rankonlb;
    if(mesarr[0].name === message.author.id) rankonlb = "1st";
    else if(mesarr[1].name === message.author.id) rankonlb = "2nd";
    else if(mesarr[2].name === message.author.id) rankonlb = "3rd";
    else if(mesarr[3].name === message.author.id) rankonlb = "4th";
    else if(mesarr[4].name === message.author.id) rankonlb = "5th";
    else if(mesarr[5].name === message.author.id) rankonlb = "6th";
    else if(mesarr[6].name === message.author.id) rankonlb = "7th";
    else if(mesarr[7].name === message.author.id) rankonlb = "8th";
    else if(mesarr[8].name === message.author.id) rankonlb = "9th";
    else if(mesarr[9].name === message.author.id) rankonlb = "10th";
    else if(mesarr[10].name === message.author.id) rankonlb = "11th";
    else if(mesarr[11].name === message.author.id) rankonlb = "12th";
    else if(mesarr[12].name === message.author.id) rankonlb = "13th";
    else if(mesarr[13].name === message.author.id) rankonlb = "14th";
    else if(mesarr[14].name === message.author.id) rankonlb = "15th";
    else if(mesarr[15].name === message.author.id) rankonlb = "16th";
    else if(mesarr[16].name === message.author.id) rankonlb = "17th";
    else if(mesarr[17].name === message.author.id) rankonlb = "18th";
    else if(mesarr[18].name === message.author.id) rankonlb = "19th";
    else if(mesarr[19].name === message.author.id) rankonlb = "20th";
    else rankonlb = "20+";

    let xp = levels[message.author.id].xp;

    var lvl;
    if(!xp || xp >= 0 && xp < 1000) lvl = 0;
    if(xp >= 1000 && xp < 2000) lvl = 1;
    if(xp >= 2000 && xp < 3000) lvl = 2;
    if(xp >= 3000 && xp < 4000) lvl = 3;
    if(xp >= 4000 && xp < 5000) lvl = 4;
    if(xp >= 5000 && xp < 6000) lvl = 5;
    if(xp >= 6000 && xp < 7000) lvl = 6;
    if(xp >= 7000 && xp < 8000) lvl = 7;
    if(xp >= 8000 && xp < 9000) lvl = 8;
    if(xp >= 9000 && xp < 10000) lvl = 9;
    if(xp >= 10000) lvl = 10;

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20${lvl}&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=${xp}/${lvl + 1}000%20xp&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {

        const lvlEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`${message.author} is lvl \`${lvl}\`, has \`${xp}\` xp and is \`${rankonlb}\` on the leaderboard!\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/${lvl + 1}000\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard`)
        return message.channel.send({ embeds: [ lvlEmbed ]})
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20${lvl}&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=${xp}/${lvl + 1}000%20xp&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level`)
        .setDescription(`${message.author} is lvl \`${lvl}\`, has \`${xp}\` xp and is \`${rankonlb}\` on the leaderboard!\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/${lvl + 1}000\` xp\n**» Rank:** \`${rankonlb}\` on the leaderboard`)
        .setImage("attachment://level.png")
        return message.channel.send({ embeds: [ lvlEmbed ], files: [ levelpic ]})
        .then(message.react("🆙"));
      }
    });
  }

  module.exports.help = {
    name: "level",
    aliases: ["lvl", "rank"],
    category: "levels"
}