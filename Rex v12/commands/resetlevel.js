const Discord = require("discord.js");
const fs = require("fs");
const levels = require("../levels.json");

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

    if(!message.member.permissions.has("MANAGE_ROLES")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't reset this user's/the server's level(s), you don't have the correct permissions (MANAGE_ROLES) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Resetlevel`)
      .setDescription(`${x} **|** ***Usage: ${prefix}resetlevel <@user/user ID>***`)
      return message.channel.send(usageEmbed);
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {

      if(!levels[args[0]]) {
        levels[args[0]] = {
          xp: 0
        }
      }
      let xp = levels[args[0]].xp;
  
      levels[args[0]] = {
        xp: 0
      }
      fs.writeFile("./levels.json", JSON.stringify(levels), (err) => {
        if(err) console.log(err);
      });

      message.delete();

      const resetlevelsEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***\`${args[0]}\`'s level has been reset to \`0\`!***`)
      message.channel.send(resetlevelsEmbed);

      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const resetlevelServerLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**» LEVELS_USER_RESET:**\n**\`${args[0]}\`'s level** has been **reset** to \`0\`!`)
        logChannel.send(resetlevelServerLogEmbed);
      }
    }

    if(!levels[member.id]) {
      levels[member.id] = {
        xp: 0
      }
    }
    let xp = levels[member.id].xp;

    levels[member.id] = {
      xp: 0
    }
    fs.writeFile("./levels.json", JSON.stringify(levels), (err) => {
      if(err) console.log(err);
    });

    message.delete();

    const resetlevelsEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setDescription(`${v} **|** ***${member}'s level has been reset to \`0\`!***`)
    message.channel.send(resetlevelsEmbed);

    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const resetlevelServerLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`**» LEVELS_USER_RESET:**\n**${member}'s level** has been **reset** to \`0\`!`)
      logChannel.send(resetlevelServerLogEmbed);
    }
  }

  module.exports.help = {
    name: "resetlevel",
    aliases: ["resetlvl"],
    category: "levels"
}