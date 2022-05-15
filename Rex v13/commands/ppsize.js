const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    let replies = ["8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8====D", "8====D", "8====D", "8====D", "8====D", "8====D", "8====D", "8=====D", "8=====D", "8=====D", "8=====D", "8=====D", "8=====D", "8======D", "8======D", "8======D", "8======D", "8======D", "8=======D", "8=======D", "8=======D", "8=======D", "8========D", "8========D", "8========D", "8=========D", "8=========D", "8==========D"];
    let result = Math.floor((Math.random() * replies.length));

    if(!args[0]) {
      const ppsizeEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`8=D | PPsize Machine`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`**${message.author}'s wiener:**\n\`\`\`${replies[result]}\`\`\``)
      return message.channel.send({ embeds: [ ppsizeEmbed ]})
      .then(message.react("😳"));
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {

      let replies = ["https://cdn.discordapp.com/embed/avatars/0.png", "https://cdn.discordapp.com/embed/avatars/1.png", "https://cdn.discordapp.com/embed/avatars/2.png", "https://cdn.discordapp.com/embed/avatars/3.png", "https://cdn.discordapp.com/embed/avatars/4.png", "https://cdn.discordapp.com/embed/avatars/5.png"]
      let result = Math.floor(Math.random() * replies.length);

      const ppsizeEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`😳 | PPsize Machine`)
      .setThumbnail(replies[result])
      .setDescription(`**${args.join(" ")}'s wiener:**\n\`\`\`${replies[result]}\`\`\``)
      return message.channel.send({ embeds: [ ppsizeEmbed ]})
      .then(message.react("😳"));
    }

    const ppsizeEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`😳 | PPsize Machine`)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`**${member}'s wiener:**\n\`\`\`${replies[result]}\`\`\``)
    message.channel.send({ embeds: [ ppsizeEmbed ]})
    .then(message.react("😳"));
  }

  module.exports.help = {
  name: "ppsize",
  aliases: [],
  category: "fun"
}