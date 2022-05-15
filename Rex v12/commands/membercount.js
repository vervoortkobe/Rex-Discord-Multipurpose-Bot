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
  
    let onlineCount = message.guild.members.cache.filter(member => member.presence.status === "online").size;
    let idleCount = message.guild.members.cache.filter(member => member.presence.status === "idle").size;
    let dndCount = message.guild.members.cache.filter(member => member.presence.status === "dnd").size;
    let offlineCount = message.guild.members.cache.filter(member => member.presence.status === "offline").size;
    
    const membercountEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`📊 | Membercount`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`**Membercount of** \`${message.guild.name}\`\n**» 📈 | Total:** \`${message.guild.memberCount}\` Members\n**» 😄 | Humans:** \`${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size}\` Humans\n**» 🤖 | Bots:** \`${message.guild.members.cache.filter(member => member.user.bot).size}\` Bots\n**» Online | Idle | DND | Offline:** \`🟢 ${onlineCount}\` | \`🟡 ${idleCount}\` | \`🔴 ${dndCount}\` | \`⚫ ${offlineCount}\``)
    message.channel.send(membercountEmbed)
    .then(message.react("📊"));
  }

  module.exports.help = {
    name: "membercount",
    aliases: [],
    category: "other"
}