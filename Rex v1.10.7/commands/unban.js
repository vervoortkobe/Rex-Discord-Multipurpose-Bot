const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`❌ | Couldn't unban the user, because you do not have the correct permission (BAN_MEMBERS) to do this!`);

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);

    if(!member) return message.channel.send(`❌ | Pls mention a valid member of this server.`);
    if(member.id === message.author.id) return message.channel.send(`❌ | You can't unban yourself!`);
    if(!member.bannable) return message.channel.send(`❌ | I couldn't unban this user! Does he/she have a higher role? Do I have ban permissions?`);
    
    message.delete().catch(O_o=>{});

    await member.unban
      .catch(error => message.channel.send(`❌ | Sorry ${message.author}, I couldn't unban because of: ${error}!`));
    message.channel.send(`✅ | <@${message.author.id}> just **unbanned ${member.user.tag}**!`);

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const unbanLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`MEMBER_BAN_REMOVE`, `${message.author.tag} just **unbanned ${member.user.tag}**!`)
    .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
    logChannel.send(unbanLogEmbed);
  }

  module.exports.help = {
    name: "unban"
}