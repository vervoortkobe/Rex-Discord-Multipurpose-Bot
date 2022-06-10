const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const botinfoEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Botinfo`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find info about me:`)
    .addField(`Version`, `${client.user.username} v1.10.5`, true)
    .addField(`Prefix`, prefix, true)
    .addField(`Bot Creation Date`, `Mon, Jul 29, 2019 9:06 AM`, true)
    .addField(`Bot Release Date`, `Tue, Aug 20, 2019 02:07 PM`, true)
    .addField(`Bot ID`, `605385562152763395`, true)
    .addField(`Creator`, `[Tsunami#6271](https://discordapp.com/channels/@me/408289224761016332)`, true)
    .addField(`Creator's YouTube`, `[Tsunami's YouTube](https://www.youtube.com/channel/UC4-I9EncGLe-YarbYzJ8JYA?sub_confirmation=1)`, true)
    .addField(`Copyright`, `© ${client.user.username} was made by Tsunami#6271,\nNobody is allowed to use the codes of ${client.user.username}, except the original creator of it ([Tsunami#6271](https://discordapp.com/channels/@me/408289224761016332))!`, true)
    .addField(`Invite`, `[Invite ${client.user.username}](http://rexbot.ga/invite)`, true)
    .addField(`Support Server`, `[Tsunami's DataBase](http://rexbot.ga/supportserver)`, true)
    .addField(`Website`, `[rexbot.ga](http://rexbot.ga)`, true)
    .addField(`Support The Project`, `[Support ${client.user.username}](http://rexbot.ga/support)`)
    .addField(`Language`, `🇬🇧 | English`, true)
    .addField(`Codelanguage`, `JavaScript (NodeJS)`, true)
    .addField(`Library`, `Discord.js`, true)
    .addField(`Servers`, `Serving ${client.guilds.size} servers!`, true)
    .addField(`Users`, `Serving ${client.users.size} users!`, true)
    .addField(`Host`, `[HostValues](https://hostvalues.eu)`, true)
    .addField(`Uptime`, `[100.00% uptime](http://rexbot.ga/api)`, true)
    .addField(`Hoster`, `[Justlikemytag#9998](https://discordapp.com/channels/@me/608377669452824597)`, true)
    .addField(`Thanks To`, `[Justlikemytag#9998](https://discordapp.com/channels/@me/608377669452824597), [ReTriX#9655](https://www.youtube.com/channel/UCxAuAR4AVg6so8mXkmNJkag?sub_confirmation=1), [Julian#7154](https://discordapp.com/channels/@me/512340866053177375), [Flor#2081](https://discordapp.com/channels/@me/554346316919210034), [AussieAdapt#5422](https://and-here-is-my-code.glitch.me/) and [The BelgiumGames](https://discord.gg/hWEpEak)`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(botinfoEmbed);
  }

  module.exports.help = {
    name: "botinfo"
}