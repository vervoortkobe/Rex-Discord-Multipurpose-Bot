const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`❌ | Couldn't mute the user, because you do not have the correct permission (KICK_MEMBERS) to do this!`);

      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("❌ | Pls mention a valid member of this server!");

      var role = member.guild.roles.find(r => r.name ==="Muted");
      if(!role)
        message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        })
        
      member.addRole(role);
      
      let duration = args.slice(1).join(' ');
      if(!duration) duration = "**no duration given**";

      message.delete().catch(O_o=>{}); 

    message.reply(`✅ | <@${message.author.id}> just **muted <@${member.user.id}> for: ${duration}**!`)

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const muteLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`MUTE`, `${message.author.tag} just **muted ${member.user.tag} for: ${duration}**!`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    logChannel.send(muteLogEmbed);
  }

  module.exports.help = {
    name: "mute"
}