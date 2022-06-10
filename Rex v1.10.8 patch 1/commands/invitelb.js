const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);
const arraySort = require("array-sort");
const table = require("table");

module.exports.run = async (client, message, args, tools) => {

    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send(`❌ | I couldn't fetch the invites of this server, because i don't have the correct permissions to do this!`);
    });

    invites = invites.array();
    arraySort(invites, 'uses', { reverse: true });

    let possibleInvites = [['Users', 'Uses']];
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.tag, invite.uses]);
    });

    const invitelbEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Invite Leaderboard`)
    .setThumbnail(message.guild.iconURL)
    .setDescription(`\`\`\`${table.table(possibleInvites)}\`\`\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(invitelbEmbed);
  }

  module.exports.help = {
    name: "invitelb"
}