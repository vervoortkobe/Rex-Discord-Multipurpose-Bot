const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`❌ | You can't use that command outside of a ticket channel!`);

    message.channel.send(`⚠️ | Are you sure you want to close this ticket? Once confirmed, you can't reverse this action!\nTo confirm, type \`-confirm\`. If confirmed, I will delete this ticket in 10 seconds. If this was a mistake, type something to cancel the deletion.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit(`❌ | Ticket close timed out, the ticket wasn't closed!`).then(m2 => {
              m2.delete();
          }, 3000);

          const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
          if(!logChannel)return;
      
          const closeLogEmbed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setTitle(`⚙️ | ${client.user.username} Logs`)
          .addField(`TICKET_DELETE`, `${message.author.tag} just **closed a ticket: <#${message.channel.id}>**!`)
          .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
          logChannel.send(closeLogEmbed);
        });
    });
  }

  module.exports.help = {
    name: "close"
}