const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const sendMessage = message.content.slice(9);
    let members = await message.guild.members;

    if(message.author.id === '404289224761016332') {

      if(!sendMessage) return message.channel.send(`❌ | Pls send a valid message!`)

      message.delete();
      
        const sendEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`⚠️ | ${client.user.username} Announcement`)
        .setDescription(sendMessage)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        members.forEach(member => {
          member.sendMessage(sendEmbed)
    
        message.channel.send(`✅ | Your message has been send!`)
        })
              
      } else {
  
      return message.channel.send(`❌ | Couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`);
      }
    }

module.exports.help = {
    name: "msgall"
}
