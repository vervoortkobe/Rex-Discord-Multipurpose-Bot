const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`❌ | Couldn't warn that user, because you do not have the correct permissions (MANAGE_MESSAGES) to do this!`);

      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.channel.send("❌ | Pls mention a valid member of this server!");
      if(member.id === message.author.id)
        return message.channel.send("❌ | You can't warn yourself!");
      if(!member.kickable) 
      return message.channel.send("❌ | I couldn't warn this user! Does he/she have a higher role?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "no reason given";

    message.delete().catch(O_o=>{});

    message.channel.send(`✅ | <@${message.author.id}> just **warned <@${member.user.id}>** because of: ${reason}!`);

    const warnPmEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⛑️ | ${client.user.username} Warned`)
    .setDescription(`You just got warned on \`${message.guild.name}\`, because of \`${reason}\`!`)
    .addField(`Server`, `\`${message.guild.name}\``)
    .addField(`Reason`, `\`${reason}\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    member.send(warnPmEmbed);

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const warnLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`WARN`, `${message.author.tag} just **warned ${member.user.tag}** because of: ${reason}!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(warnLogEmbed);
  }

  module.exports.help = {
    name: "warn"
}