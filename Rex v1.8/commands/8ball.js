const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!args[2]) return message.channel.send(`❌ | Pls ask a full question!`);

    let replies = ["Yes!", "No!", "Idk!", "Maybe!", "Probably!", "Ask again later!"];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    const ballEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🎱 | ${client.user.username} 8Ball`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .addField(`Question`, question)
    .addField(`Answer`, replies[result])
    .setFooter(`© Rex was made by Tsunami#6271`)
    message.channel.send(ballEmbed)
  }

module.exports.help = {
  name: "8ball"
}