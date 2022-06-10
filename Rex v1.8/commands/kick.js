const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`❌ | Couldn't kick the user, because you do not have the correct permission (KICK_MEMBERS) to do this!`);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("❌ | Pls mention a valid member of this server!");
    if(!member.kickable) 
      return message.reply("❌ | I couldn't kick this user! Does he/she have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "**no reason given**";
    
    await member.kick(reason)
      .catch(error => message.reply(`❌ | Sorry ${message.author}, I couldn't kick this user because of: ${error}!`));
    message.reply(`✅ |  <@${message.author.id}> just kicked ${member.user.tag} because of: **${reason}**!`);

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const kickLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`MEMBER_KICK`, `${message.author.tag} just **kicked ${member.user.tag} because of: ${reason}**!`)
    .addField(`${member.guild.name} now has ${member.guild.memberCount} members!`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    logChannel.send(kickLogEmbed);
  }

  module.exports.help = {
    name: "kick"
}