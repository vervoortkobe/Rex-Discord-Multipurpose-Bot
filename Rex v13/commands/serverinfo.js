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

    if(args[0]) {
      if(message.author.id == "408289224761016332") {
        
        const findServer = client.guilds.cache.get(args[0]);
        if(!findServer) {
          const usageEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setAuthor(`⚙️ | Serverinfo`)
          .setDescription(`${x} **|** ***Usage: ${prefix}serverinfo <server ID>***`)
          return message.channel.send({ embeds: [ usageEmbed ]});
        }
  
        message.delete();
  
        const checkEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***I sent it in your dm, ${message.author}!***`)
        message.channel.send({ embeds: [ checkEmbed ]});
        
        let ctotalSeconds = ((Date.now() - findServer.createdAt) / 1000);
        let cyears = Math.floor(ctotalSeconds / 31556926);
        ctotalSeconds %= 31556926;
        let cdays = Math.floor(ctotalSeconds / 86400);
        ctotalSeconds %= 86400;
        let chours = Math.floor(ctotalSeconds / 3600);
        ctotalSeconds %= 3600;
        let cminutes = Math.floor(ctotalSeconds / 60);
        let cseconds = Math.floor(ctotalSeconds % 60);
        let createdat = `${cyears}y ${cdays}d ${chours}h ${cminutes}m ${cseconds}s`;
        
        let onlineCount = findServer.members.cache.filter(member => member.presence !== null && member.presence.status === "online").size;
        let idleCount = findServer.members.cache.filter(member => member.presence !== null && member.presence.status === "idle").size;
        let dndCount = findServer.members.cache.filter(member => member.presence !== null && member.presence.status === "dnd").size;
        let offlineCount = findServer.members.cache.filter(member => member.presence === null).size;
      
        const serverinfoEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Serverinfo`)
        .setThumbnail(findServer.iconURL())
        .setDescription(`**» Server Name:** \`${findServer.name}\`\n**» Server ID:** \`${findServer.id}\`\n**» 👑 | Server Owner (ID):** \`${client.users.cache.get(findServer.ownerId).tag}\` - \`${client.users.cache.get(findServer.ownerId).id}\`\n**» Server Creation Date:** \`${findServer.createdAt.toLocaleDateString("nl-BE")}\`\n\`${createdat} ago\`\n**» 📈 | Total:** \`${findServer.memberCount}\` Members\n**» 😄 | Humans:** \`${findServer.memberCount - findServer.members.cache.filter(member => member.user.bot).size}\` Humans\n**» 🤖 | Bots:** \`${findServer.members.cache.filter(member => member.user.bot).size}\` Bots\n**» Online | Idle | DND | Offline:** \`🟢 ${onlineCount}\` | \`🟡 ${idleCount}\` | \`🔴 ${dndCount}\` | \`⚫ ${offlineCount}\`\n**» Channels:** \`${findServer.channels.cache.size}\` Channels\n**» Roles:** \`${findServer.roles.cache.size - 1}\` Roles\n**» Current Prefix:** \`${prefix}\``)
        message.member.send({ embeds: [ serverinfoEmbed ]})
        .catch(err => console.log(err));
      }
    }

    let ctotalSeconds = ((Date.now() - message.guild.createdAt) / 1000);
    let cyears = Math.floor(ctotalSeconds / 31556926);
    ctotalSeconds %= 31556926;
    let cdays = Math.floor(ctotalSeconds / 86400);
    ctotalSeconds %= 86400;
    let chours = Math.floor(ctotalSeconds / 3600);
    ctotalSeconds %= 3600;
    let cminutes = Math.floor(ctotalSeconds / 60);
    let cseconds = Math.floor(ctotalSeconds % 60);
    let createdat = `${cyears}y ${cdays}d ${chours}h ${cminutes}m ${cseconds}s`;
    
    let onlineCount = message.guild.members.cache.filter(member => member.presence !== null && member.presence.status === "online").size;
    let idleCount = message.guild.members.cache.filter(member => member.presence !== null && member.presence.status === "idle").size;
    let dndCount = message.guild.members.cache.filter(member => member.presence !== null && member.presence.status === "dnd").size;
    let offlineCount = message.guild.members.cache.filter(member => member.presence === null).size;
  
    const serverinfoEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🤖 | Serverinfo`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`**» Server Name:** \`${message.guild.name}\`\n**» Server ID:** \`${message.guild.id}\`\n**» 👑 | Server Owner:** ${message.guild.members.cache.get(message.guild.ownerId)}\n**» Server Creation Date:** \`${message.guild.createdAt.toLocaleDateString("nl-BE")}\`\n\`${createdat} ago\`\n**» 📈 | Total:** \`${message.guild.memberCount}\` Members\n**» 😄 | Humans:** \`${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size}\` Humans\n**» 🤖 | Bots:** \`${message.guild.members.cache.filter(member => member.user.bot).size}\` Bots\n**» Online | Idle | DND | Offline:** \`🟢 ${onlineCount}\` | \`🟡 ${idleCount}\` | \`🔴 ${dndCount}\` | \`⚫ ${offlineCount}\`\n**» Channels:** \`${message.guild.channels.cache.size}\` Channels\n**» Roles:** \`${message.guild.roles.cache.size - 1}\` Roles\n**» Current Prefix:** \`${prefix}\``)
    message.channel.send({ embeds: [ serverinfoEmbed ]})
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "serverinfo",
    aliases: ["guildinfo"],
    category: "other"
}