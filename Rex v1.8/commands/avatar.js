const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!memberToFind) {
      return message.channel.send(`❌ | Pls mention a valid member of this server!`);
  }

    const avatarEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Avatar`)
    .setAuthor(memberToFind.user.tag, memberToFind.user.avatarURL)
    .setImage(memberToFind.user.avatarURL)
    .setFooter(`© Rex was made by Tsunami#6271`)
  message.channel.send(avatarEmbed);
  }

  module.exports.help = {
    name: "avatar"
}