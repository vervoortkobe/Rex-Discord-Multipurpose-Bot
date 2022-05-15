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

    let ytcomment = encodeURIComponent(args.join(" "));
    const ytcommentPic = (`https://some-random-api.ml/canvas/youtube-comment?username=${message.author.username}&comment=${ytcomment}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`);

    if(!args[0]) {
    const usageEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setAuthor(`⚙️ | YTComment`)
    .setDescription(`${x} **|** ***Usage: ${prefix}ytcomment <comment>***`)
    return message.channel.send(usageEmbed);
  }

    message.delete();

    const ytcommentEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`💬 | YTComment`)
    .setImage(ytcommentPic)
    message.channel.send(ytcommentEmbed)
    .then(message.react("💬"));
  }

  module.exports.help = {
    name: "ytcomment",
    aliases: [],
    category: "imgs"
}