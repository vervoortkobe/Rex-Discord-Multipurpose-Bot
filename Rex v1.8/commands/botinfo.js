const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const botinfoEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Botinfo`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find info about me:`)
    .addField(`Version`, `Rex v1.8`)
    .addField(`Prefix`, prefix)
    .addField(`Bot Creation Date`, `Mon, Jul 29, 2019 9:06 AM`)
    .addField(`Bot Release Date`, `Tue, Aug 20, 2019 02:07 PM`)
    .addField(`Bot ID`, `605385562152763395`)
    .addField(`Creator`, `[Tsunami#6271](https://discordapp.com/channels/@me/408289224761016332)`)
    .addField(`Creator's YouTube`, `[Tsunami's YouTube](https://www.youtube.com/channel/UC4-I9EncGLe-YarbYzJ8JYA?sub_confirmation=1)`)
    .addField(`Copyright`, `© Rex was made by Tsunami#6271,\nNobody is allowed to use the codes of tRex, except the original creator of it ([Tsunami#6271](https://discordapp.com/channels/@me/408289224761016332))!`)
    .addField(`Invite`, `[Invite Rex](http://rexbot.ga/invite)`)
    .addField(`Support Server`, `[Tsunami's DataBase](http://rexbot.ga/supportserver)`)
    .addField(`Website`, `[rexbot.ga](http://rexbot.ga)`)
    .addField(`Language`, `🇬🇧 | English`)
    .addField(`Codelanguage`, `JavaScript (NodeJS)`)
    .addField(`Library`, `Discord.js`)
    .addField(`Servers`, `Serving ${client.guilds.size} servers!`)
    .addField(`Users`, `Serving ${client.users.size} users!`)
    .addField(`Host`, `[HostValues](https://hostvalues.eu)`)
    .addField(`Uptime`, `[100.00% uptime](http://rexbot.ga/api)`)
    .addField(`Thanks To`, `[Justlikemytag#9998](https://discordapp.com/channels/@me/608377669452824597), [ReTriX#9655](https://www.youtube.com/channel/UCxAuAR4AVg6so8mXkmNJkag?sub_confirmation=1), [Julian#7154](https://discordapp.com/channels/@me/512340866053177375), [Flor#2081](https://discordapp.com/channels/@me/554346316919210034), [The BelgiumGames](https://discord.gg/hWEpEak) and [GitHub](https://github.com/)`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    message.channel.send(botinfoEmbed);
  }

  module.exports.help = {
    name: "botinfo"
}