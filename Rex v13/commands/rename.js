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

    let ticketrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
    if(message.member.roles.cache.has(ticketrole.id)) {
      
      if(!message.channel.name.startsWith(`ticket-`)) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***You can't use that command outside of a ticket channel!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }
      
      if(!args[0]) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | Rename`)
        .setDescription(`${x} **|** ***Usage: ${prefix}rename <new-ticket-name>***`)
        return message.channel.send({ embeds: [ usageEmbed ]});
      }

      message.delete();
      
      message.channel.setName(`ticket-${args[0]}`);

      const checkEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***${message.author}, I have renamed this ticket to #ticket-${args[0]}!***`)
      message.channel.send({ embeds: [ checkEmbed ]});
  
      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(logChannel) {
        const ticketLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setDescription(`**» TICKET_RENAME:**\n**${message.author} renamed a ticket to #ticket-${args[0]}**!`)
        logChannel.send({ embeds: [ ticketLogEmbed ]});
      }
      
    } else {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't rename this ticket, you don't have the correct role (Ticket Support) to do this!***`)
      return message.channel.send({ embeds: [ ticketLogEmbed ]});
    }
  }

  module.exports.help = {
    name: "rename",
    aliases: [],
    category: "tickets"
}