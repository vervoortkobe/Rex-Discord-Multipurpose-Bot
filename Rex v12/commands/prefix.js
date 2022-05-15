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

    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't change my prefix for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0] || !args[1]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Prefix`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`${x} **|** ***Usage: ${prefix}prefix set <new prefix>***\n**» Current Prefix:** \`${prefix}\``)
      return message.channel.send(usageEmbed);
    }

    if(args[0] === `set`) {

      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

      prefixes[message.guild.id] = {
        prefixes: args[1]
      }

      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if(err) console.log(err);
      });

      const prefixEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setAuthor(`⚙️ | Prefix`)
      .setDescription(`${v} **|** ***My prefix for this server has been set to: \`${args[1]}\`***`)
      message.channel.send(prefixEmbed)
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const prefixLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**» CONFIG_PREFIX:**\nMy **prefix** for this server has been set to: \`${args[1]}\``)
        logChannel.send(prefixLogEmbed);
      }
    }
  }

  module.exports.help = {
    name: "prefix",
    aliases: ["setprefix"],
    category: "config"
}