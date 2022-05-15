const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");

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
      .setDescription(`${x} **|** ***I couldn't warn this member, because I don't have permissions to manage messages!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't warn this member, you don't have the correct permissions (MANAGE_MESSAGES) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Warn`)
      .setDescription(`${x} **|** ***Usage: ${prefix}warn <@member/member ID> [reason]***`)
      .setFooter(`<> = required | [] = optional`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(member.id === message.author.id) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't warn yourself!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
    
    if(member.bot) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't warn a bot!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
    
    if(member.kickable === false) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't warn this member! Does he/she have a higher role than me?***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given";

    message.delete();

    const warnEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setDescription(`${v} **|** ***${member} has been warned, because of ${reason}!***`)
    message.channel.send({ embeds: [ warnEmbed ]});

    db.push(`info.${message.guild.id}.${member.id}`, { date: moment().format("DD-MM-YYYY"), warnedby: message.author.id, reason: reason });

    const warnPmEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`⚠️ | Warned`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`You were warned in \`${message.guild.name}\`, because of \`${reason}\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Warning\`\n**» Reason:** \`${reason}\``)
    member.send({ embeds: [ warnPmEmbed ]})
    .catch(err => console.log(err));

    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const warnLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`**» MEMBER_WARN:**\n${message.author} **warned ${member}, because of ${reason}**!`)
      logChannel.send({ embeds: [ warnLogEmbed ]});
    }
  }

  module.exports.help = {
    name: "warn",
    aliases: [],
    category: "mod"
}