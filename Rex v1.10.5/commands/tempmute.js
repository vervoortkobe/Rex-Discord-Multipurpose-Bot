const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`❌ | Couldn't tempmute the user, because you do not have the correct permissions (KICK_MEMBERS) to do this!`);

    let tempmuteTime = args[1];
    let timeDuration = args[2];

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
    let muteRole = message.guild.roles.find(r => r.name ==="Muted");

    if(!member) return message.channel.send(`❌ | Pls mention a valid member of this server.`);
    if(member.id === message.author.id) return message.channel.send(`❌ | You can't tempmute yourself!`);
    if(!member.kickable) return message.channel.send(`❌ | I couldn't tempmute this user! Does he/she have a higher role? Do I have ban permissions?`);
    if(member.roles.has(muteRole)) {
      return message.channel.send(`❌ | Couldn't mute the user, because he/she is already muted!`);
      
    } else {

    const tempmuteUsageEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Tempmute`)
    .setDescription(`Usage: **${prefix}tempmute <user> <time> <m/h/d> <reason>**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    if(!args[1]) return message.channel.send(tempmuteUsageEmbed);

    const atempmuteUsageEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Tempmute`)
    .setDescription(`Usage: **${prefix}tempmute <user> <time> <m/h/d> <reason>**`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    if(!args[2]) return message.channel.send(atempmuteUsageEmbed);

    if(timeDuration === `m`) {
      tempmuteTime = (args[1])*60;
    }

    if(timeDuration === `h`) {
      tempmuteTime = (args[1])*3600
    }
  
    if(timeDuration === `d`) {
      tempmuteTime = (args[1])*86400;
    }

    if(timeDuration === `w`) {
      tempmuteTime = (args[1])*604800;
    }

    if(!muteRole)
      message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
    member.addRole(muteRole);
    
    let reason = args.slice(3).join(' ');
    if(!reason) reason = "no reason given";

    message.delete().catch(O_o=>{});

    message.channel.send(`✅ | <@${message.author.id}> just **tempmuted ${member.user.tag} for: ${args[1]}${args[2]}**, because of: ${reason}!`);

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const tempmuteLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`MEMBER_TEMPMUTE`, `${message.author.tag} just **tempmuted ${member.user.tag} for: ${args[1]}${args[2]}**, because of: ${reason}!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(tempmuteLogEmbed);

    try {

      setTimeout(function () {

      if(!muteRole)
        message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        })
      member.removeRole(muteRole);
  
      message.channel.send(`✅ | **${member.user.tag} just got unmuted**! (Tempmute for ${args[1]}${args[2]}, because of: ${reason})`);

      const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
      if(!logChannel)return;  

      const tempmuteUnmuteLogEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Logs`)
      .addField(`MEMBER_UNMUTE`, `${member.user.tag} just got **unmuted**! (Tempmute for: ${args[1]}${args[2]}, because of: ${reason})`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      logChannel.send(tempmuteUnmuteLogEmbed);
  
      }, 1000 * tempmuteTime);

    } catch (err) {

      message.channel.send(`❌ | Pls give a valid time!`);

      console.log(err);
      }
    }
  }

  module.exports.help = {
    name: "tempmute"
}