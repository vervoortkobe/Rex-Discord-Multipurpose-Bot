const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const helpEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setDescription(`Hey, I'm ${client.user.username}! Here are my commands:`)
    .addField(`🤖 | Help`, `\`${prefix}help\``, true)
    .addField(`⛑ | Moderation`, `\`${prefix}kick\`, \`${prefix}ban\`, \`${prefix}mute\`, \`${prefix}warn\`, \`${prefix}clear\` or \`${prefix}purge\``, true)
    .addField(`⛭ | Setup`, `\`${prefix}logs\`, \`${prefix}prefix\``, true)
    .addField(`🎟️ | Tickets`, `\`${prefix}new\` or \`${prefix}ticket\`, \`${prefix}close\``, true)
    .addField(`📁 | Other`, `\`${prefix}giveaway\`, \`${prefix}say\`, \`${prefix}at\`, \`${prefix}yesno\`, \`${prefix}serverinfo\`, \`${prefix}whois\`, \`${prefix}avatar\`, \`${prefix}servericon\`, \`${prefix}token\``, true)
    .addField(`😂 | Fun`, `\`${prefix}lvl\`, \`${prefix}rps\`, \`${prefix}8ball\`, \`${prefix}chatbot\`, \`${prefix}meme\`, \`${prefix}joke\`, \`${prefix}comment\`, \`${prefix}dog\`, \`${prefix}shiba\`, \`${prefix}cat\`, \`${prefix}bird\`, \`${prefix}fox\`, \`${prefix}panda\`, \`${prefix}redpanda\`, \`${prefix}koala\`, \`${prefix}llama\`, \`${prefix}raccoon\`, \`${prefix}kangooroo\`, \`${prefix}whale\`, \`${prefix}pika\`, \`${prefix}anime\`, \`${prefix}neko\`, \`${prefix}wink\`, \`${prefix}hug\`, \`${prefix}pat\`, \`${prefix}facepalm\`, \`${prefix}slap\`, \`${prefix}cry\`, \`${prefix}hack\`, \`${prefix}kill\`, \`${prefix}shoot\`, \`${prefix}suicide\`, \`${prefix}reverse\``)
    .addField(`🔞 | Nsfw`, `\`${prefix}hentai\`, \`${prefix}yuri\`, \`${prefix}trap\`, \`${prefix}nsfwneko\``)
    .addField(`📥 | About`, `\`${prefix}ping\`, \`${prefix}invite\`, \`${prefix}botinfo\`, \`${prefix}supportserver\`, \`${prefix}botchangelog\`, \`${prefix}api\`, \`${prefix}site\``)
    .setFooter(`© Rex was made by Tsunami#6271`)
    message.channel.send(helpEmbed);
  }

  module.exports.help = {
    name: "help"
}