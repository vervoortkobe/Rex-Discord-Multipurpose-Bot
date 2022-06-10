const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
    let msg = args.join(' ');

    if(!member) return message.channel.send(`❌ | Pls mention a valid member of this server.`);
    if(member.id === message.author.id) return message.channel.send(`❌ | You can't message yourself!`);
    

    if(message.author.id === '404289224761016332') {

      if(!msg) return message.channel.send(`❌ | Pls send a valid message!`)

      message.delete();
      
        const messageEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`⚠️ | ${client.user.username} Announcement`)
        .setDescription(msg)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        member.send(messageEmbed)
    
        message.channel.send(`✅ | Your message has been send!`)
              
      } else {
  
      return message.channel.send(`❌ | I couldn't send a message, because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`);
      }
    }

module.exports.help = {
    name: "msg"
}