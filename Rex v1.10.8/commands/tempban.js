const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`❌ | Couldn't tempban the user, because you do not have the correct permissions (BAN_MEMBERS) to do this!`);

    let tempbanTime = args[1];
    let timeDuration = args[2];

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);

    if(!member) return message.channel.send(`❌ | Pls mention a valid member of this server.`);
    if(member.id === message.author.id) return message.channel.send(`❌ | You can't tempban yourself!`);
    if(!member.bannable) return message.channel.send(`❌ | I couldn't tempban this user! Does he/she have a higher role? Do I have ban permissions?`);

    if(!tempbanTime || !timeDuration) {
      const tempbanUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Tempban`)
      .setDescription(`Usage: **${prefix}tempban <user> <time> <m/h/d/w> <reason>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(tempbanUsageEmbed);
    }

    if(timeDuration === `m`) {
      tempbanTime = (args[1])*60;
    }
    if(timeDuration === `h`) {
      tempbanTime = (args[1])*3600
    }
    if(timeDuration === `d`) {
      tempbanTime = (args[1])*86400;
    }
    if(timeDuration === `w`) {
      tempbanTime = (args[1])*604800;
    }

    
    if(!timeDuration === `m` || !timeDuration === `h` || !timeDuration === `d` || !timeDuration === `w`) return message.channel.send(tempbanUsageEmbed);
    
    let reason = args.slice(3).join(' ');
    if(!reason) reason = "no reason given";

    message.delete().catch(O_o=>{});

    member.ban(reason)
      .catch(error => message.channel.send(`❌ | Sorry <@${message.author.id}>, I couldn't tempban because of: ${error}!`));
    message.channel.send(`✅ | <@${message.author.id}> just **tempbanned ${member.user.tag} for: ${args[1]}${args[2]}, because of: ${reason}**!`);

    const tempbanPmEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⛑️ | ${client.user.username} Tempbanned`)
    .setDescription(`You just got tempbanned from \`${message.guild.name}\` for: \`${args[1]}${args[2]}\`, because of \`${reason}\`!`)
    .addField(`Server`, `\`${message.guild.name}\``)
    .addField(`Duration`, `\`${args[1]}${args[2]}\``)
    .addField(`Reason`, `\`${reason}\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    member.send(tempbanPmEmbed);

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const tempbanLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`MEMBER_TEMPBAN_ADD`, `${message.author.tag} just **tempbanned ${member.user.tag} for: ${args[1]}${args[2]}, because of: ${reason}**!`)
    .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
    logChannel.send(tempbanLogEmbed);

    try {

      setTimeout(function () {

      message.guild.unban(member.id);
  
      message.channel.send(`✅ | **${member.user.tag} just got unbanned**! (Tempban for ${args[1]}${args[2]}, because of: ${reason})`);

      const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
      if(!logChannel)return;  

      const tempbanUnbanLogEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Logs`)
      .addField(`MEMBER_TEMPBAN_REMOVE`, `**${member.user.tag} just got unbanned**! (Tempban for: ${args[1]}${args[2]}, because of: ${reason})`)
      .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
      logChannel.send(tempbanUnbanLogEmbed);
  
      }, 1000 * tempbanTime);

    } catch (err) {

      message.channel.send(`❌ | Pls give a valid time!`);

      console.log(err);
    }
  }

  module.exports.help = {
    name: "tempban"
}