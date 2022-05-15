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

    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't set the ticket category for this server, because I don't have permissions to manage channels!***`)
      return message.channel.send(errorEmbed);
    }

    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't set the ticket category for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    let catnameid = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);

    if(!args[0] || !args[1] || !catnameid) {

      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));

      let text;
      if(!ticketcats[message.guild.id]) {
        text = `${disabled} \`Not configured yet\``;
      } else {
        let ticketcat = ticketcats[message.guild.id].ticketcats;
        let thecatname = message.guild.channels.cache.get(ticketcats).name;
        text = `${enabled} \`#${thecatname}\``;
      }
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Ticket Category`)
      .setDescription(`${x} **|** ***Usage: ${prefix}ticketcat set <#category/category ID>***\n**» Ticket Category:** ${text}`)
      return message.channel.send(usageEmbed);
    }

    if(args[0] === `set`) {

      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));

      ticketcats[message.guild.id] = {
        ticketcats: args[1]
      }

      fs.writeFile("./ticketcats.json", JSON.stringify(ticketcats), (err) => {
        if(err) console.log(err);
      });

      const ticketcatEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setAuthor(`⚙️ | Ticket Category`)
      .setDescription(`${v} **|** ***The ticket category for this server has been set to: <#${args[1]}>***`)
      message.channel.send(ticketcatEmbed)
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(logChannel) {
        const ticketcatLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setDescription(`**» CONFIG_TICKET_CATEGORY:**\nThe **ticket category** for this server has been set to: **<#${args[1]}>**`)
        logChannel.send(ticketcatLogEmbed);
      }
    }
  }

  module.exports.help = {
    name: "ticketcat",
    aliases: [],
    category: "tickets"
}