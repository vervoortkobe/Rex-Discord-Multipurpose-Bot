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
  
    let onlineCount = message.guild.members.cache.filter(member => member.presence !== null && member.presence.status === "online").size;
    let idleCount = message.guild.members.cache.filter(member => member.presence !== null && member.presence.status === "idle").size;
    let dndCount = message.guild.members.cache.filter(member => member.presence !== null && member.presence.status === "dnd").size;
    let offlineCount = message.guild.members.cache.filter(member => member.presence === null).size;

    const chartdata = new ChartJsImage();
    chartdata.setConfig({
      type: "bar",
      data: {
        datasets: [{
          label: `Total (${message.guild.memberCount})`,
          backgroundColor: "#03A8F4",
          data: [message.guild.memberCount]
        },
        {
          label: `Humans (${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size})`,
          backgroundColor: "#B042FF",
          data: [message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size]
        },
        {
          label: `Bots (${message.guild.members.cache.filter(member => member.user.bot).size})`,
          backgroundColor: "#FF6600",
          data: [message.guild.members.cache.filter(member => member.user.bot).size]
        },
        {
          label: `Online (${onlineCount})`,
          backgroundColor: "#3BA55D",
          data: [onlineCount]
        },
        {
          label: `Idle (${idleCount})`,
          backgroundColor: "#FAA81A",
          data: [idleCount]
        },
        {
          label: `DND (${dndCount})`,
          backgroundColor: "#ED4245",
          data: [dndCount]
        },
        {
          label: `Offline (${offlineCount})`,
          backgroundColor: "#747F8D",
          data: [offlineCount]
        }]
      }
    })
    .setBackgroundColor("#36393F")
    .setWidth(600)
    .setHeight(300);

    let charturl = await chartdata.getUrl();
    
    const chartPic = new Discord.MessageAttachment(`${charturl}`, "membercount.png");

    const membercountEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`📊 | Membercount`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`\`${message.guild.name}\`**'s Membercount:**\n**» 📈 | Total:** \`${message.guild.memberCount}\` Members\n**» 😄 | Humans:** \`${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size}\` Humans\n**» 🤖 | Bots:** \`${message.guild.members.cache.filter(member => member.user.bot).size}\` Bots\n**» Online | Idle | DND | Offline:** \`🟢 ${onlineCount}\` | \`🟡 ${idleCount}\` | \`🔴 ${dndCount}\` | \`⚫ ${offlineCount}\``)
    .setImage("attachment://membercount.png")
    message.channel.send({ embeds: [ membercountEmbed ], files: [ chartPic ] })
    .then(message.react("📊"));
  }

  module.exports.help = {
    name: "membercount",
    aliases: [],
    category: "other"
}