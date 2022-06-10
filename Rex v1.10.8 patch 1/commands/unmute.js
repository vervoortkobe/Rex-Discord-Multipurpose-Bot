const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`❌ | Couldn't unmute the user, because you do not have the correct permission (KICK_MEMBERS) to do this!`);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let muteRole = message.guild.roles.find(r => r.name ==="Muted");
    
    if(!member)
      return message.channel.send("❌ | Pls mention a valid member of this server!");
    if(!member.roles.has(muteRole)) {
      return message.channel.send(`❌ | Couldn't unmute the user, because he/she wasn't muted!`);
    }

    if(!muteRole)
      message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
    member.removeRole(muteRole);

    message.delete().catch(O_o=>{});

    message.channel.send(`✅ | <@${message.author.id}> just **unmuted <@${member.user.id}>**!`)

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const unmuteLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`MEMBER_UNMUTE`, `${message.author.tag} just **unmuted ${member.user.tag}**!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(unmuteLogEmbed);
  }

  module.exports.help = {
    name: "unmute"
}