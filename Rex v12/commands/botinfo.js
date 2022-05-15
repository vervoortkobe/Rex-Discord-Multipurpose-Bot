const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");

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
  
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const botinfoEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🤖 | Botinfo`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**» Version:** \`v1.12\`\n**» Default Prefix:** \`${prefix}\`\n**» Bot Creation Date:** \`2019-7-29\`\n**» Bot Release Date:** \`2019-8-20\`\n**» Bot ID:** \`${client.user.id}\`\n**» Developer:** \`Tsunami#6271\`\n**» Copyright:** \`© developed by Tsunami#6271\`\n**» Invite:** You can invite ${client.user.username} **[here](https://rexbot.ga/invite)**!\n**» Support Server: [rexbot.ga/discord](https://rexbot.ga/discord)**\n**» Website: [rexbot.ga](https://rexbot.ga)**\n**» Donate: [Paypal](https://rexbot.ga/donate)**\n**» Language:** \`English\`\n**» Code Language:** \`NodeJS\`\n**» Library:** \`Discord.js\`\n**» Commands:** You can look them up **[here](https://rexbot.ga/commands)**!\n**» Uptime:** \`${uptime}\`\n**» Memory Usage:** \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\``)
    message.channel.send(botinfoEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "botinfo",
    aliases: [],
    category: "about"
}