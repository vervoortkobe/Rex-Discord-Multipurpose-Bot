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

    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't purge these messages, because I don't have permissions to manage messages!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't purge these messages, because you don't have the correct permissions (MANAGE_MESSAGES) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Purge`)
      .setDescription(`${x} **|** ***Usage: ${prefix}purge <value between \`0\` and \`\`100>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    if(Number.isInteger(parseInt(args[0]))) {
      if(parseInt(args[0]) > 0 && parseInt(args[0]) < 100) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount);

        const purgeEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***${message.author} purged \`${amount - 1}\` messages!***`)
        message.channel.send({ embeds: [ purgeEmbed ]})
        .then(m => setTimeout(() => m.delete(), 5000));

        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const purgeLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(`**» MESSAGES_PURGED:**\n**${message.author} purged \`${amount - 1}\` messages in ${message.channel}**!`)
          logChannel.send({ embeds: [ purgeLogEmbed ]});
        }
        
      } else {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***You can't purge more than \`99\` messages!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

    } else {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please define the amount of messages to purge!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
  }

  module.exports.help = {
    name: "purge",
    aliases: ["clear"],
    category: "mod"
}