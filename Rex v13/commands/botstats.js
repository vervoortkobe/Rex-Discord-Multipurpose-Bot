const Discord = require("discord.js");
const fs = require("fs");
const ChartJsImage = require("chartjs-to-image");

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

    
    const chartdata = new ChartJsImage();
    chartdata.setConfig({
      type: "bar",
      data: {
        datasets: [{
          label: `Servers (${client.guilds.cache.size})`,
          backgroundColor: "#03A8F4",
          data: [client.guilds.cache.size]
        },
        {
          label: `Users (${client.users.cache.size})`,
          backgroundColor: "#1bb47f",
          data: [client.users.cache.size]
        },
        {
          label: `Channels (${client.channels.cache.size})`,
          backgroundColor: "#909fdc",
          data: [client.channels.cache.size]
        },
        {
          label: `Emojis (${client.emojis.cache.size})`,
          backgroundColor: "#db5f48",
          data: [client.emojis.cache.size]
        }]
      }
    })
    .setBackgroundColor("#36393F")
    .setWidth(600)
    .setHeight(300);

    let charturl = await chartdata.getUrl();
    
    const chartPic = new Discord.MessageAttachment(`${charturl}`, "membercount.png");

    const botstatsEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`📊 | Botstats`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`**» Cached Servers:** \`${client.guilds.cache.size}\`\n**» Cached Users:** \`${client.users.cache.size}\`\n**» Cached Channels:** \`${client.channels.cache.size}\`\n**» Cached Emojis:** \`${client.emojis.cache.size}\`\n**» Uptime:** \`${uptime}\`\n**» Memory Usage:** \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\``)
    .setImage("attachment://membercount.png")
    message.channel.send({ embeds: [ botstatsEmbed ], files: [ chartPic ] })
    .then(message.react("📊"));
  }

  module.exports.help = {
    name: "botstats",
    aliases: [],
    category: "about"
}