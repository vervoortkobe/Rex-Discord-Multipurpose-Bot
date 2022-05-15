const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    const emptyheart = client.emojis.cache.get("805098133285109771");
    const fullheart = client.emojis.cache.get("805098110551588916");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!args[0] || !args[1]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Ship`)
      .setDescription(`${x} **|** ***Usage: ${prefix}ship <object> <object>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let random = Math.floor((Math.random() * 100));
    let hearts;
    if(random >= 0 && random < 10) hearts = `${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 10 && random < 20) hearts = `${fullheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 20 && random < 30) hearts = `${fullheart}${fullheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 30 && random < 40) hearts = `${fullheart}${fullheart}${fullheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 40 && random < 50) hearts = `${fullheart}${fullheart}${fullheart}${fullheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 50 && random < 30) hearts = `${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 60 && random < 70) hearts = `${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${emptyheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 70 && random < 80) hearts = `${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${emptyheart}${emptyheart}${emptyheart}`;
    if(random >= 80 && random < 90) hearts = `${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${emptyheart}${emptyheart}`;
    if(random >= 90 && random <= 99) hearts = `${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${emptyheart}`;
    if(random === 100) hearts = `${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}${fullheart}`;

    const shipEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`❤️ | Ship`)
    .setDescription(`**${args[0]}** ❤️ **${args[1]}** for \`${random}%\`!\n${hearts}`)
    message.channel.send({ embeds: [ shipEmbed ]})
    .then(message.react("❤️"));
  }

  module.exports.help = {
    name: "ship",
    aliases: [],
    category: "fun"
}