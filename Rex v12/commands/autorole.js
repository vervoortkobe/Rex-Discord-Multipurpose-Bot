const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    
    const enabled = client.emojis.cache.get("792517063918223380");
    const disabled = client.emojis.cache.get("792517072956817409");

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
      .setDescription(`${x} **|** ***I couldn't set the autorole for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    let rolenameid = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if(!args[0] || !args[1] || !rolenameid) {
      let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf-8"));
      
      let text;
      if(!autoroles[message.guild.id]) {
        text = `${disabled} \`Not configured yet\``;
      } else {
        let autorole = autoroles[message.guild.id].autoroles;
        text = `${enabled} <@&${autorole}>`;
      }
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Autorole`)
      .setDescription(`${x} **|** ***Usage: ${prefix}autorole set <@role/role ID>***\n**» Autorole:** ${text}`)
      return message.channel.send(usageEmbed);
    }

    if(args[0] === `set`) {

      let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf-8"));

      autoroles[message.guild.id] = {
        autoroles: rolenameid.id
      }

      fs.writeFile("./autoroles.json", JSON.stringify(autoroles), (err) => {
        if(err) console.log(err);
      });

      const autoroleEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setAuthor(`⚙️ | Autorole`)
      .setDescription(`${v} **|** ***The autorole for this server has been set to: ${rolenameid}***`)
      message.channel.send(autoroleEmbed)
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const autoroleLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**» CONFIG_AUTOROLE:**\nThe **autorole** for this server has been set to: **${rolenameid}**`)
        logChannel.send(autoroleLogEmbed);
      }
    }
  }

  module.exports.help = {
    name: "autorole",
    aliases: [],
    category: "config"
}