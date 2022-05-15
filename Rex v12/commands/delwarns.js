const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");

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

    if(!message.member.permissions.has("MANAGE_MESSAGES")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't delete this user's warnings, you don't have the correct permissions (MANAGE_MESSAGES) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Delwarns`)
      .setDescription(`${x} **|** ***Usage: ${prefix}delwarns <@user/user ID>***`)
      return message.channel.send(usageEmbed);
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {

      let warnInfo = db.fetch(`info.${message.guild.id}.${args[0]}`);

      if(!warnInfo) {
        const noWarningsEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***This user doesn't have any warnings to delete!***`)
        return message.channel.send(noWarningsEmbed);

      } else {

        for(let warnings of warnInfo) {
          let date = warnings.date;
          let warnedby = warnings.warnedby;
          let reason = warnings.reason;

          message.delete();
  
          const delwarnsEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***\`${args[0]}\`'s warnings have been deleted!***`)
          message.channel.send(delwarnsEmbed);

          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const delwarnsLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(useravatar)
            .setDescription(`**» USER_WARNINGS_DELETED:**\n${message.author} **deleted \`${args[0]}\`'s warnings!**`)
            logChannel.send(delwarnsLogEmbed);
          }
        }
    
        db.delete(`info.${message.guild.id}.${args[0]}`);
      }
    }

    let warnInfo = db.fetch(`info.${message.guild.id}.${member.id}`);

    if(!warnInfo) {
      const noWarningsEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***${member} doesn't have any warnings to delete!***`)
      return message.channel.send(noWarningsEmbed);

    } else {

      message.delete();

      const delwarnsEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***${member}'s warnings have been deleted!***`)
      message.channel.send(delwarnsEmbed);

      db.delete(`info.${message.guild.id}.${member.id}`);
      
      const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
      if(logChannel) {
        const delwarnsLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**» USER_WARNINGS_DELETED:**\n**${member}'s warnings have been deleted!**`)
        logChannel.send(delwarnsLogEmbed);
      }
    }
  }

  module.exports.help = {
    name: "delwarns",
    aliases: ["delwarnings"],
    category: "mod"
}