const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`❌ | You can't use that command outside of a ticket channel!`);

    message.channel.send(`⚠️ | Are you sure you want to close this ticket? Once confirmed, you can't reverse this action!\nTo confirm, type \`-confirm\`. This ticket will be deleted in 10 seconds. Type something to cancel the deletion.`)
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
      
          const newLogEmbed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setTitle(`⚙️ | ${client.user.username} Logs`)
          .addField(`TICKET_DELETE`, `${message.author.tag} just **closed a ticket: <#${c.id}>**!`)
          .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
          logChannel.send(newLogEmbed);
        });
    });
  }

  module.exports.help = {
    name: "close"
}