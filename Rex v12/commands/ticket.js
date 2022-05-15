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

    let reason = message.content.split(" ").slice(1).join(" ");
    if(!reason) reason = "No reason given";
    let ticketsupportrolefind = message.guild.roles.cache.find(r => r.name === `Ticket Support`);
    if(!ticketsupportrolefind) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***This server doesn't have a*** *Ticket Support* ***role, so the ticket won't be created!\nIf you're an Administrator, please create a \`Ticket Support\` role and give it to users that should be able to manage the tickets.***`)
      return message.channel.send(errorEmbed);
    }
    const existingTicket = message.guild.channels.cache.find(c => c.name === `ticket-${message.author.username.toLowerCase().replace(" ", "-")}-${message.author.discriminator}`);
    if(!existingTicket) {

      message.guild.channels.create(`ticket-${message.author.username.toLowerCase()}-${message.author.discriminator}`, {
        type: "text",
        reason: `This ticket was created by ${message.author.tag}, because of ${reason}!`,
        topic: `This ticket was created by ${message.author}, because of ${reason}!`
      }).then(c => {

        setTimeout(() => {

          let everyone = message.guild.roles.everyone;

          c.updateOverwrite(message.author, {
            "SEND_MESSAGES": true,
            "VIEW_CHANNEL": true,
            "READ_MESSAGE_HISTORY": true,
            "ATTACH_FILES": true,
            "ADD_REACTIONS": false
          });

          c.updateOverwrite(ticketsupportrolefind, {
            "VIEW_CHANNEL": true,
            "READ_MESSAGE_HISTORY": true,
            "SEND_MESSAGES": true,
            "ATTACH_FILES": true,
            "ADD_REACTIONS": false
          });

          c.updateOverwrite(everyone, {
            "VIEW_CHANNEL": false,
            "READ_MESSAGE_HISTORY": false,
            "SEND_MESSAGES": false,
            "ATTACH_FILES": false,
            "ADD_REACTIONS": false
          });

        }, 2000);
    
        let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
        if(ticketcats[message.guild.id]) {

          let ticketcat = ticketcats[message.guild.id].ticketcats;
          
          let isthereticketcat = message.guild.channels.cache.find(c => c.id === ticketcat);
          if(!isthereticketcat) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
            return message.channel.send(errorEmbed);
          }

          c.setParent(`${ticketcat}`);

          let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));

          ticketowners[c.id] = {
            ticketowners: message.author.id
          }

          fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
            if(err) console.log(err);
          });

        }

        setTimeout(() => {
          const ticketEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .addField(`Hey, ${message.author.tag}!`, `**You've made a ticket, because of \`${reason}\`!**\nPls explain your request as detailed as possible!\nOur **Support Team** will help you as fast as possible!`)
          .addField(`Do you want to close this ticket?`, `Simply **react** with the \`🗑️\` reaction on this message!`)
          .addField(`Do you want to create a transcript of this ticket?`, `Simply **react** with the \`📝\` reaction on this message!`)
          c.send(ticketEmbed).then(m => {
            m.react("🗑️");
            m.react("📝");
          });
          
          const ticketSupportRole = message.guild.roles.cache.find(r => r.name === `Ticket Support`);
          c.send(`> ${ticketSupportRole}`)
          .then(m => m.delete({ timeout: 5000 }));
        }, 1000);
          
        const checkEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***${message.author}, your ticket has been created: <#${c.id}>!***`)
        message.channel.send(checkEmbed);

        const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
        if(logChannel) {
          const ticketLogEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setAuthor(`⚙️ | Logs`)
          .setDescription(`**» TICKET_CREATE:**\n**${message.author} created a new ticket: #${c.name}**, because of **${reason}**!`)
          logChannel.send(ticketLogEmbed);
        }
        
      }).catch(err => console.log(err));
      
    } else {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You already created a ticket!***`)
      return message.channel.send(errorEmbed);
    }
  }

  module.exports.help = {
    name: "ticket",
    aliases: ["new"],
    category: "tickets"
}