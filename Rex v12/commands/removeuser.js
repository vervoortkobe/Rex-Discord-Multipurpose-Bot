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

    if(!message.channel.name.startsWith(`ticket-`)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't use that command outside of a ticket channel!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Removeuser`)
      .setDescription(`${x} **|** ***Usage: ${prefix}removeuser <@member/member ID>***`)
      return message.channel.send(usageEmbed);
    }
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Removeuser`)
      .setDescription(`${x} **|** ***Usage: ${prefix}removeuser <@member/member ID>***`)
      return message.channel.send(usageEmbed);
    }

    if(member.id === message.author.id) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't remove yourself from this ticket!***`)
      return message.channel.send(errorEmbed);
    }
    
    message.channel.updateOverwrite(member, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false,
      ATTACH_FILES: false
    });

    message.delete();

    const checkEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setDescription(`${v} **|** ***${message.author}, I have removed ${member} from this ticket (${message.channel}!***`)
    message.channel.send(checkEmbed);
    
    const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
    if(logChannel) {
      const ticketLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setDescription(`**» TICKET_MEMBER_REMOVEUSER:**\n${message.author} **removed ${member} from ticket ${message.channel}**!`)
      logChannel.send(ticketLogEmbed);
    }
  }

  module.exports.help = {
    name: "removeuser",
    aliases: [],
    category: "tickets"
}