const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const commentPic = (`https://some-random-api.ml/beta/youtube-comment?username=${message.author.username}&comment=${args}&avatar=${message.author.avatarURL}`);

    if(!args[0]){
      const commentUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Comment`)
      .setDescription(`Usage: **${prefix}chatbot <comment>**`)
      .setFooter(`© Rex was made by Tsunami#6271`)
      message.channel.send(commentUsageEmbed);
    }

    const commentEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`💬 | ${client.user.username} Comment`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(commentPic)
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(commentEmbed);
  }

  module.exports.help = {
    name: "comment"
}