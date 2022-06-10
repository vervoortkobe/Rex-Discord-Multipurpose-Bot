const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const commandlistEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Commandlist`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here is a list of all my command: ()`)
    .addField(`Total Commands Count`, `\`156\` Commands`)
    .addField(`\`${prefix}8ball\`, \`${prefix}aliases\`, \`${prefix}anal\`, \`${prefix}anime\`, \`${prefix}animeavatar\`, \`${prefix}animewallpaper\`, \`${prefix}api\`, \`${prefix}apply\`, \`${prefix}autorole\`, \`${prefix}avatar\`, \n\`${prefix}ban\`, \`${prefix}bear\`, \`${prefix}birb\`, \`${prefix}blur\`, \`${prefix}blurple\`, \`${prefix}booty\`, \`${prefix}botchangelog\`, \`${prefix}botinfo\`, \n\`${prefix}calc\`, \`${prefix}car\`, \`${prefix}cat\`, \`${prefix}chatbot\`, \`${prefix}classic\`, \`${prefix}clear\`, \`${prefix}close\`, \`${prefix}coinflip\`, \`${prefix}commandlist\`, \`${prefix}comment\`, \`${prefix}cry\`, \`${prefix}cuddle\`, \n\`${prefix}dog\`, \`${prefix}dolphin\`, \n\`${prefix}eevee\`, \`${prefix}elephant\`, \`${prefix}ero\`, \n\`${prefix}facepalm\`, \`${prefix}femdom\`, \`${prefix}fish\`, \`${prefix}food\`, \`${prefix}fox\`, \`${prefix}foxgirl\`, \n\`${prefix}gay\`, \`${prefix}geoip\`, \`${prefix}giraffe\`, \`${prefix}giveaway\`, \`${prefix}glass\`, \`${prefix}goose\`, \`${prefix}greyscale\`, \`${prefix}guessnr\`, \n\`${prefix}hack\`, \`${prefix}hamster\`, \`${prefix}hanal\`, \`${prefix}hbj\`, \`${prefix}hboobs\`, \`${prefix}hcum\`, \`${prefix}help\`, \`${prefix}hentai\`, \`${prefix}hgif\`, \`${prefix}horse\`, \`${prefix}howgay\`, \`${prefix}hpussy\`, \`${prefix}hug\`, \n\`${prefix}invert\`, \`${prefix}invite\`, \n\`${prefix}joinleave\`, \`${prefix}joke\`, \n\`${prefix}kangaroo\`, \`${prefix}kick\`, \`${prefix}kill\`, \`${prefix}killerwhale\`, \`${prefix}kiss\`, \`${prefix}koala\`, \n\`${prefix}lesbian\`, \`${prefix}level\`, \`${prefix}lion\`, \`${prefix}lizard\`, \`${prefix}llama\`, \`${prefix}lockdown\`, \`${prefix}lyrics\`, \n\`${prefix}mcuserncheck\`, \`${prefix}meme\`, \`${prefix}rex-msglogs\`, \`${prefix}mute\`, \n\`${prefix}neko\`, \`${prefix}new\`, \`${prefix}nickname\`, \`${prefix}nsfwneko\`, \n\`${prefix}onetwo\`, \n\`${prefix}panda\`, \`${prefix}pat\`, \`${prefix}penguin\`, \`${prefix}penissize\`, \`${prefix}pig\`, \`${prefix}pika\`, \`${prefix}ping\`, \`${prefix}pixelate\`, \`${prefix}pokedex\`, \`${prefix}poll\`, \`${prefix}prefix\`, \`${prefix}pussy\`, \`${prefix}pwankg\`, \n\`${prefix}quokka\`, \`${prefix}quote\`, \n\`${prefix}raccoon\`, \`${prefix}redpanda\`, \`${prefix}report\`, \`${prefix}reverse\`, \`${prefix}rex-apply\`, \`${prefix}rex-logs\`, \`${prefix}rex-reports\`, \`${prefix}rps\`, \n\`${prefix}say\`, \`${prefix}seal\`, \`${prefix}sepia\`, \`${prefix}servercount\`, \`${prefix}servericon\`, \`${prefix}serverinfo\`, \`${prefix}serverlist\`, \`${prefix}shark\`, \`${prefix}shiba\`, \`${prefix}shoot\`, \`${prefix}site\`, \`${prefix}slap\`, \`${prefix}snake\`, \`${prefix}spank\`, \`${prefix}spider\`, \`${prefix}spin\`, \`${prefix}suicide\`, \`${prefix}support\`, \`${prefix}supportus\`, \n\`${prefix}teamtrees\`, \`${prefix}tempban\`, \`${prefix}templock\`, \`${prefix}tempmute\`, \`${prefix}tickle\`, \`${prefix}trap\`, \`${prefix}trigger\`, \`${prefix}turtle\`, \n\`${prefix}unban\`, \`${prefix}unlock\`, \`${prefix}unmute\`, \n\`${prefix}version\`, \n\`${prefix}waifu\`, \`${prefix}warn\`, \`${prefix}wasted\`, \`${prefix}weapon\`, \`${prefix}webhook\`, \`${prefix}whale\`, \`${prefix}whois\`, \`${prefix}why\`, \`${prefix}wink\`, \n\`${prefix}yesno\`, \`${prefix}youtube\`, \`${prefix}yuri\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(commandlistEmbed);
  }

  module.exports.help = {
    name: "commandlist"
}