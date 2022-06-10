const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`❌ | Couldn't warn that user, because you do not have the correct permission (MANAGE_MESSAGES) to do this!`);

      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("❌ | Pls mention a valid member of this server!");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "no reason given";

        message.delete().catch(O_o=>{}); 

    message.reply(`✅ | <@${message.author.id}> just **warned <@${member.user.id}> because of: ${reason}**!`);

    const logChannel = member.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const warnLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`WARN`, `${message.author.tag} just **warned ${member.user.tag} because of: ${reason}**!`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    logChannel.send(warnLogEmbed);
  }

  module.exports.help = {
    name: "warn"
}