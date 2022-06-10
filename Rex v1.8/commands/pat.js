const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;
    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);

    fetch('https://some-random-api.ml/animu/pat')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

      if (!memberToFind) {
        return message.channel.send(`❌ | Pls mention a valid member of this server!`);
      }
    message.channel.send(`😄 | <@${message.author.id}> just patted <@${memberToFind.user.id}>!`);

    const patEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😄 | ${client.user.username} Pat`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(data.link)
    .setFooter(`© Rex was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(patEmbed);
    })
  }

  module.exports.help = {
    name: "pat"
}