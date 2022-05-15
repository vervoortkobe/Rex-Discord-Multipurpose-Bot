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

    if(!args[1]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | 8Ball`)
      .setDescription(`${x} **|** ***Usage: ${prefix}8ball <question>***`)
      return message.channel.send(usageEmbed);
    }

    let replies = ["Yes!", "Yeah!", "No!", "Idk!", "Maybe!", "Probably!", "Ask again later!"];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    const ballEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🎱 | 8Ball`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`**» Question:** ${question}\n**» Answer:** ${replies[result]}`)
    message.channel.send(ballEmbed)
    .then(message.react("🎱"));
  }

  module.exports.help = {
    name: "8ball",
    aliases: [],
    category: "fun"
}