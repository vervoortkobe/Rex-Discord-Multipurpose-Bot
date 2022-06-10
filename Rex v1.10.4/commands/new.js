const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let reason = message.content.split(" ").slice(1).join(" ");

    if(!reason) reason = "no reason given";
    if(!message.guild.roles.exists("name", "Ticket Support")) return message.channel.send(`❌ | This server doesn't have a **Ticket Support** role, so the ticket won't be created!\nIf you're an Administrator, pls create a \`Ticket Support\` role and give it to users that should be able to manage the tickets.`);
    if(message.guild.channels.exists("name", `ticket-${message.author.username}`)) return message.channel.send(`❌ | You already created a ticket!`);

    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Ticket Support");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`✅ | <@${message.author.id}>, your ticket has been created: <#${c.id}>!`);

        const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
        if(!logChannel)return;
    
        const newLogEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`⚙️ | ${client.user.username} Logs`)
        .addField(`TICKET_CREATE`, `${message.author.tag} just **created a new ticket: <#${c.id}>, because of: ${reason}**!`)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        logChannel.send(newLogEmbed);
        
        const newEmbed = new Discord.RichEmbed()
        .setColor(0x0ff000)
        .addField(`Hey ${message.author.tag}!`, `**You've made a ticket because of:** \`${reason}\`**!**\nPls explain your request as detailed as possible! Our **Support Team** will help you as fast as possible!`)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        .setTimestamp();
        c.send(newEmbed);
    }).catch(console.error);
  }

  module.exports.help = {
    name: "new"
}