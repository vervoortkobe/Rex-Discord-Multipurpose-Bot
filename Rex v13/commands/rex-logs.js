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

    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't create a ${client.user.username} logs channel for this server, because I don't have permissions to manage channels!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't create a ${client.user.username} logs channel for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
    }

    message.guild.channels.create(`rex-logs`, { type: "GUILD_TEXT" }).then(c => {
      let role = message.guild.roles.cache.find(r => r.name === "@everyone");
      c.permissionOverwrites.edit(role, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGES: false
      });

      const checkEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***The ${client.user.username} logs channel for this server has been created: ${c}!***`)
      message.channel.send({ embeds: [ checkEmbed ]})
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const msglogsLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**» CONFIG_LOGS:**\nThe **${client.user.username} logs channel** for this server has been **created: ${c}**!`)
        logChannel.send({ embeds: [ msglogsLogEmbed ]});
      }
    });
  }

  module.exports.help = {
    name: "rex-logs",
    aliases: ["rexlogs", "logs"],
    category: "config"
}