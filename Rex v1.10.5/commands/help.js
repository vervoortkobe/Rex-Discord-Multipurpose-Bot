const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

  if(!args[0]) {
    
    const helpEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here are my help commands:`)
    .addField(`⛑ | Moderation`, `\`${prefix}help mod\``, true)
    .addField(`⚙️ | Setup`, `\`${prefix}help setup\``, true)
    .addField(`🎟️ | Tickets`, `\`${prefix}help tickets\``, true)
    .addField(`📁 | Other`, `\`${prefix}help other\``, true)
    .addField(`😂 | Fun`, `\`${prefix}help fun\``, true)
    .addField(`📷 | Images`, `\`${prefix}help img\``, true)
    .addField(`🔞 | Nsfw`, `\`${prefix}help nsfw\``, true)
    .addField(`📥 | About`, `\`${prefix}help about\``, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpEmbed);
  }

  if(args[0] === `mod`) {

    const helpModerationEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help Moderation`)
    .addField(`⛑ | Moderation (8)`, `\`${prefix}ban\`, \`${prefix}clear\`, \`${prefix}kick\`, \`${prefix}lockdown\`, \`${prefix}mute\`, \`${prefix}tempban\`, \`${prefix}templock\`, \`${prefix}tempmute\`, \`${prefix}unban\`, \`${prefix}unlock\`, \`${prefix}unmute\`, \`${prefix}warn\``, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpModerationEmbed);
  }

  if(args[0] === `setup`) {

    const helpSetupEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help Setup`)
    .addField(`⚙️ | Setup (3)`, `\`${prefix}autorole\`, \`${prefix}logs\`, \`${prefix}prefix\``, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpSetupEmbed);
  }

  if(args[0] === `tickets`) {

    const helpTicketsEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help Tickets`)
    .addField(`🎟️ | Tickets (2)`, `\`${prefix}close\`, \`${prefix}new\``, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpTicketsEmbed);
  }

  if(args[0] === `other`) {

    const helpOtherEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help Other`)
    .addField(`📁 | Other (10)`, `\`${prefix}avatar\`, \`${prefix}giveaway\`, \`${prefix}nickname\`, \`${prefix}poll\`, \`${prefix}say\`, \`${prefix}servercount\`, \`${prefix}serverinfo\`, \`${prefix}servericon\`, \`${prefix}whois\`, \`${prefix}yesno\``, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpOtherEmbed);
  }

  if(args[0] === `fun`) {

    const helpFunEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help Fun`)
    .addField(`😂 | Fun (16)`, `\`${prefix}8ball\`, \`${prefix}calc\`, \`${prefix}chatbot\`, \`${prefix}coinflip\`, \`${prefix}geoip\`, \`${prefix}guessnr\`, \`${prefix}hack\`, \`${prefix}howgay\`, \`${prefix}joke\`, \`${prefix}level\`, \`${prefix}lyrics\`, \`${prefix}mcuserncheck\`, \`${prefix}penissize\`, \`${prefix}pokedex\`, \`${prefix}quote\`, \`${prefix}rps\`, \`${prefix}why\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpFunEmbed);
  }

  if(args[0] === `img`) {

    const helpImgEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help Images`)
    .addField(`📷 | Images (65)`, `\`${prefix}anime\`, \`${prefix}animeavatar\`, \`${prefix}bear\`, \`${prefix}birb\`, \`${prefix}blur\`, \`${prefix}blurple\`, \`${prefix}car\`, \`${prefix}cat\`, \`${prefix}comment\`, \`${prefix}cry\`, \`${prefix}cuddle\`, \`${prefix}dog\`, \`${prefix}dolphin\`, \`${prefix}eevee\`, \`${prefix}elephant\`, \`${prefix}facepalm\`, \`${prefix}fish\`, \`${prefix}food\`, \`${prefix}fox\`, \`${prefix}foxgirl\`, \`${prefix}gay\`, \`${prefix}giraffe\`, \`${prefix}glass\`, \`${prefix}goose\`, \`${prefix}greyscale\`, \`${prefix}hamster\`, \`${prefix}horse\`, \`${prefix}hug\`, \`${prefix}invert\`, \`${prefix}kangaroo\`, \`${prefix}kill\`, \`${prefix}killerwhale\`, \`${prefix}koala\`, \`${prefix}lion\`, \`${prefix}lizard\`, \`${prefix}llama\`, \`${prefix}meme\`, \`${prefix}panda\`, \`${prefix}pat\`, \`${prefix}penguin\`, \`${prefix}pig\`, \`${prefix}pika\`, \`${prefix}pixelate\`,  \`${prefix}quokka\`, \`${prefix}raccoon\`, \`${prefix}redpanda\`, \`${prefix}reverse\`, \`${prefix}seal\`, \`${prefix}sepia\`, \`${prefix}shark\`, \`${prefix}shiba\`, \`${prefix}shoot\`, \`${prefix}slap\`, \`${prefix}snake\`, \`${prefix}spider\`, \`${prefix}spin\`, \`${prefix}suicide\`, \`${prefix}tickle\`, \`${prefix}trigger\`, \`${prefix}turtle\`, \`${prefix}waifu\`, \`${prefix}wasted\`, \`${prefix}weapon\`, \`${prefix}whale\`, \`${prefix}wink\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpImgEmbed);
  }

  if(args[0] === `nsfw`) {
    if(message.channel.nsfw === false) {

      const helpNoNsfwEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`🤖 | ${client.user.username} Help Nsfw`)
      .addField(`🔞 | Nsfw (21)`, `\`❌ | Couldn't show the nsfw commands, because this isn't an nsfw channel!\``)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(helpNoNsfwEmbed);
    }
  }

  if(args[0] === `nsfw`) {
    if(message.channel.nsfw === true) {

      const helpNsfwEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`🤖 | ${client.user.username} Help Nsfw`)
      .addField(`🔞 | Nsfw (21)`, `\`${prefix}anal\`, \`${prefix}booty\`, \`${prefix}classic\`, \`${prefix}ero\`, \`${prefix}femdom\`, \`${prefix}hanal\`, \`${prefix}hbj\`, \`${prefix}hboobs\`, \`${prefix}hcum\`, \`${prefix}hentai\`, \`${prefix}hgif\`, \`${prefix}hpussy\`, \`${prefix}lesbian\`, \`${prefix}neko\`, \`${prefix}nsfwneko\`, \`${prefix}pussy\`, \`${prefix}pwankg\`, \`${prefix}solo\`, \`${prefix}spank\`, \`${prefix}trap\`, \`${prefix}yuri\``)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(helpNsfwEmbed);
    }
  }

  if(args[0] === `about`) {

    const helpAboutEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help About`)
    .addField(`📥 | About (8)`, `\`${prefix}aliases\`, \`${prefix}api\`, \`${prefix}botchangelog\`, \`${prefix}botinfo\`, \`${prefix}invite\`, \`${prefix}ping\`, \`${prefix}site\`, \`${prefix}supportus\`, \`${prefix}supportserver\`, \`${prefix}version\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpAboutEmbed);
  }

  if(args[0] === `owner`) {
    if(message.author.id === '404289224761016332') {

    const helpOwnerEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help Owner`)
    .addField(`👑 | Owner (3)`, `\`${prefix}msgall\`, \`${prefix}serverlist\`, \`${prefix}webhook\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpOwnerEmbed);
    }

  } else {

    return message.channel.send(`❌ | Couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`);
  }
}

  module.exports.help = {
    name: "help"
}