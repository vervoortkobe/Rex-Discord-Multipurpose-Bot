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

    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't setup my serverstats function for this server, because I don't have permissions to manage channels!***`)
      return message.channel.send(errorEmbed);
    }

    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't setup my serverstats function for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
  }

    message.guild.channels.create("📊 | Server Stats", { type: "category" }).then(cat => {
      let everyone = message.guild.roles.everyone;

      cat.overwritePermissions([{
        id: everyone,
        deny: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "CONNECT", "SPEAK"]
      }]);

      message.guild.channels.create(`📈 | Total: ${message.guild.memberCount}`, { type: "voice" }).then(c => {
        c.setParent(cat.id);
      });

      message.guild.channels.create(`😄 | Humans: ${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size}`, { type: "voice" }).then(c => {
        c.setParent(cat.id);
      });

      message.guild.channels.create(`🤖 | Bots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, { type: "voice" }).then(c => {
        c.setParent(cat.id);
      });

    });

    const serverstatsEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setDescription(`${v} **|** ***My serverstats function has been setup for this server!***`)
    message.channel.send(serverstatsEmbed)
    .then(message.react("⚙️"));
    
    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const serverstatsLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`**» CONFIG_SERVERSTATS:**\nMy **serverstats function** has been **setup** for this server!`)
      logChannel.send(serverstatsLogEmbed);
    }
  }

  module.exports.help = {
    name: "serverstats",
    aliases: [],
    category: "config"
}