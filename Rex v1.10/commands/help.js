const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

  if(message.channel.nsfw === false) {
    
    const helpEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here are my commands:`)
    .addField(`🤖 | Help (2)`, `\`${prefix}help\`, \`${prefix}aliases\``, true)
    .addField(`⛑ | Moderation (8)`, `\`${prefix}kick\`, \`${prefix}ban\`, \`${prefix}mute\`, \`${prefix}unmute\`, \`${prefix}warn\`, \`${prefix}clear\`, \`${prefix}lockdown\`, \`${prefix}unlock\``, true)
    .addField(`⚙️ | Setup (3)`, `\`${prefix}autorole\`, \`${prefix}logs\`, \`${prefix}prefix\``, true)
    .addField(`🎟️ | Tickets (2)`, `\`${prefix}new\`, \`${prefix}close\``, true)
    .addField(`📁 | Other (11)`, `\`${prefix}giveaway\`, \`${prefix}say\`, \`${prefix}poll\`, \`${prefix}yesno\`, \`${prefix}serverinfo\`, \`${prefix}servercount\`, \`${prefix}whois\`, \`${prefix}avatar\`, \`${prefix}servericon\`, \`${prefix}token\``, true)
    .addField(`😂 | Fun (41)`, `\`${prefix}level\`, \`${prefix}rps\`, \`${prefix}8ball\`, \`${prefix}penissize\`, \`${prefix}weapon\`, \`${prefix}chatbot\`, \`${prefix}meme\`, \`${prefix}trigger\`, \`${prefix}gay\`, \`${prefix}wasted\`, \`${prefix}greyscale\`, \`${prefix}invert\`, \`${prefix}joke\`, \`${prefix}why\`, \`${prefix}comment\`, \`${prefix}dog\`, \`${prefix}shiba\`, \`${prefix}cat\`, \`${prefix}goose\`, \`${prefix}birb\`, \`${prefix}fox\`, \`${prefix}panda\`, \`${prefix}redpanda\`, \`${prefix}koala\`, \`${prefix}kangooroo\`, \`${prefix}llama\`, \`${prefix}seal\`, \`${prefix}raccoon\`, \`${prefix}whale\`, \`${prefix}lizard\`, \`${prefix}quokka\`, \`${prefix}pika\`, \`${prefix}anime\`, \`${prefix}animeavatar\`, \`${prefix}waifu\`, \`${prefix}foxgirl\`, \`${prefix}wink\`, \`${prefix}hug\`, \`${prefix}cuddle\`, \`${prefix}pat\`, \`${prefix}tickle\`, \`${prefix}facepalm\`, \`${prefix}slap\`, \`${prefix}cry\`, \`${prefix}hack\`, \`${prefix}kill\`, \`${prefix}shoot\`, \`${prefix}suicide\`, \`${prefix}reverse\``)
    .addField(`🔞 | Nsfw (20)`, `\`❌ | Couldn't show the nsfw commands, because this isn't an nsfw channel!\``)
    .addField(`📥 | About (7)`, `\`${prefix}ping\`, \`${prefix}invite\`, \`${prefix}botinfo\`, \`${prefix}supportserver\`, \`${prefix}botchangelog\`, \`${prefix}api\`, \`${prefix}site\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpEmbed);
  }

  if(message.channel.nsfw === true) {

    const helpNsfwEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setDescription(`Hey, I'm ${client.user.username}! Here are my commands:`)
    .addField(`🤖 | Help (2)`, `\`${prefix}help\`, \`${prefix}aliases\``, true)
    .addField(`⛑ | Moderation (8)`, `\`${prefix}kick\`, \`${prefix}ban\`, \`${prefix}mute\`, \`${prefix}unmute\`, \`${prefix}warn\`, \`${prefix}clear\`, \`${prefix}lockdown\`, \`${prefix}unlock\``, true)
    .addField(`⚙️ | Setup (3)`, `\`${prefix}autorole\`, \`${prefix}logs\`, \`${prefix}prefix\``, true)
    .addField(`🎟️ | Tickets (2)`, `\`${prefix}new\`, \`${prefix}close\``, true)
    .addField(`📁 | Other (11)`, `\`${prefix}giveaway\`, \`${prefix}say\`, \`${prefix}poll\`, \`${prefix}yesno\`, \`${prefix}serverinfo\`, \`${prefix}servercount\`, \`${prefix}whois\`, \`${prefix}avatar\`, \`${prefix}servericon\`, \`${prefix}token\``, true)
    .addField(`😂 | Fun (41)`, `\`${prefix}level\`, \`${prefix}rps\`, \`${prefix}8ball\`, \`${prefix}penissize\`, \`${prefix}weapon\`, \`${prefix}chatbot\`, \`${prefix}meme\`, \`${prefix}trigger\`, \`${prefix}gay\`, \`${prefix}wasted\`, \`${prefix}greyscale\`, \`${prefix}invert\`, \`${prefix}joke\`, \`${prefix}why\`, \`${prefix}comment\`, \`${prefix}dog\`, \`${prefix}shiba\`, \`${prefix}cat\`, \`${prefix}goose\`, \`${prefix}birb\`, \`${prefix}fox\`, \`${prefix}panda\`, \`${prefix}redpanda\`, \`${prefix}koala\`, \`${prefix}kangooroo\`, \`${prefix}llama\`, \`${prefix}seal\`, \`${prefix}raccoon\`, \`${prefix}whale\`, \`${prefix}lizard\`, \`${prefix}quokka\`, \`${prefix}pika\`, \`${prefix}anime\`, \`${prefix}animeavatar\`, \`${prefix}waifu\`, \`${prefix}foxgirl\`, \`${prefix}wink\`, \`${prefix}hug\`, \`${prefix}cuddle\`, \`${prefix}pat\`, \`${prefix}tickle\`, \`${prefix}facepalm\`, \`${prefix}slap\`, \`${prefix}cry\`, \`${prefix}hack\`, \`${prefix}kill\`, \`${prefix}shoot\`, \`${prefix}suicide\`, \`${prefix}reverse\``)
    .addField(`🔞 | Nsfw (20)`, `\`${prefix}hentai\`, \`${prefix}hgif\`, \`${prefix}hboobs\`, \`${prefix}hpussy\`, \`${prefix}hcum\`, \`${prefix}hbj\`, \`${prefix}hanal\`, \`${prefix}nsfwneko\`, \`${prefix}neko\`, \`${prefix}yuri\`, \`${prefix}solo\`, \`${prefix}lesbian\`, \`${prefix}trap\`, \`${prefix}femdom\`, \`${prefix}pwankg\`, \`${prefix}ero\`, \`${prefix}spank\`, \`${prefix}classic\`, \`${prefix}pussy\`, \`${prefix}anal\`, \`${prefix}booty\``)
    .addField(`📥 | About (7)`, `\`${prefix}ping\`, \`${prefix}invite\`, \`${prefix}botinfo\`, \`${prefix}supportserver\`, \`${prefix}botchangelog\`, \`${prefix}api\`, \`${prefix}site\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(helpNsfwEmbed);
    }
  }

  module.exports.help = {
    name: "help"
}