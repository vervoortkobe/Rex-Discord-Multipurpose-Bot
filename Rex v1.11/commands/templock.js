const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`❌ | Couldn't templock the channel, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    let templockTime = args[0];
    let timeDuration = args[1];

    if(!templockTime || !timeDuration) {
      const templockUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Templock`)
      .setDescription(`Usage: **${prefix}templock <time> <m/h/d/w>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(templockUsageEmbed);
    }

    if(timeDuration === `m`) {
      templockTime = (args[0])*60;
    }
    if(timeDuration === `h`) {
      templockTime = (args[0])*3600
    }
    if(timeDuration === `d`) {
      templockTime = (args[0])*86400;
    }
    if(timeDuration === `w`) {
      templockTime = (args[0])*604800;
    }

    
    if(!timeDuration === `m` || !timeDuration === `h` || !timeDuration === `d` || !timeDuration === `w`) return message.channel.send(templockUsageEmbed);

    let role = message.guild.roles.find("name", "@everyone");
    message.channel.overwritePermissions(role, {
      SEND_MESSAGES: false
  });

    message.delete().catch(O_o=>{}); 

    message.channel.send(`✅ | <@${message.author.id}> just **templocked <#${message.channel.id}> for: ${args[0]}${args[1]}**!`)

    const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const templockLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`CHANNEL_TEMPLOCK`, `${message.author.tag} just **templocked <#${message.channel.id}> for: ${args[0]}${args[1]}**!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(templockLogEmbed);

    try {

      setTimeout(function () {

      let role = message.guild.roles.find("name", "@everyone");
      message.channel.overwritePermissions(role, {
      SEND_MESSAGES: true
    });

      message.channel.send(`✅ | **<#${message.channel.id}> just got unlocked**! (Templock for: ${args[0]}${args[1]})`)

      const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
      if(!logChannel)return;
  
      const templockUnlockLogEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Logs`)
      .addField(`CHANNEL_UNLOCK`, `**<#${message.channel.id}> just got unlocked**! (Templock for: ${args[0]}${args[1]})`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      logChannel.send(templockUnlockLogEmbed);
  
      }, 1000 * templockTime);

    } catch (err) {

      message.channel.send(`❌ | Pls give a valid time!`);

      console.log(err);
    }
  }

  module.exports.help = {
    name: "templock"
}