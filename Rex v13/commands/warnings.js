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

    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't check this user's warnings, because I don't have permissions to manage messages!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't check this user's warnings, you don't have the correct permissions (MANAGE_MESSAGES) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
    
    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Warnings`)
      .setDescription(`${x} **|** ***Usage: ${prefix}warnings <@user/user ID>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      let warnInfo = db.fetch(`info.${message.guild.id}.${args[0]}`);

      if(!warnInfo) {
        const noWarningsEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚠️ | Warnings`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`${x} **|** ***This user doesn't have any warnings yet!***`)
        return message.channel.send({ embeds: [ noWarningsEmbed ]});
      }
  
      const warningsEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚠️ | Warnings`)
      .setThumbnail(message.guild.iconURL())
  
      for(let warnings of warnInfo) {
        let date = warnings.date;
        let warnedby = warnings.warnedby;
        let reason = warnings.reason;
  
        warningsEmbed.addField(`\`${args[0]}\``, `**» Date:** \`${date}\`\n**» Warned By:** <@${warnedby}>\n**» Reason:** \`${reason}\``, true);
      }
  
      message.react("⚠️");

      return message.channel.send({ embeds: [ warningsEmbed ]})
      .catch(err => {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***This user has too many warnings to display!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      });
    }

    let warnInfo = db.fetch(`info.${message.guild.id}.${member.id}`);

    if(!warnInfo) {
      const noWarningsEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚠️ | Warnings`)
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`${x} **|** ***This user doesn't have any warnings yet!***`)
      return message.channel.send({ embeds: [ noWarningsEmbed ]});
    }

    const warningsEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`⚠️ | Warnings`)
    .setThumbnail(member.user.displayAvatarURL())

    for(let warnings of warnInfo) {
      let date = warnings.date;
      let warnedby = warnings.warnedby;
      let reason = warnings.reason;

      warningsEmbed.addField(`\`${member.user.tag}\``, `**» Date:** \`${date}\`\n**» Warned By:** <@${warnedby}>\n**» Reason:** \`${reason}\``, true);
    }

    message.react("⚠️");

    message.channel.send({ embeds: [ warningsEmbed ]})
    .catch(err => {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***This user has too many warnings to display!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    });
  }

  module.exports.help = {
    name: "warnings",
    aliases: ["warns", "infractions"],
    category: "mod"
}