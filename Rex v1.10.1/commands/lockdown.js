const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`❌ | Couldn't lock the channel down, because you do not have the correct permission (ADMINISTRATOR) to do this!`);
    let role = message.guild.roles.find("name", "@everyone");
    message.channel.overwritePermissions(role, {
      SEND_MESSAGES: false
  });

    message.delete().catch(O_o=>{}); 

  message.channel.send(`✅ | <@${message.author.id}> just **locked <#${message.channel.id}> down**!`)

    const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const lockdownLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`CHANNEL_LOCKDOWN`, `${message.author.tag} just **locked <#${message.channel.id}> down**!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(lockdownLogEmbed);
  }

  module.exports.help = {
    name: "lockdown"
}