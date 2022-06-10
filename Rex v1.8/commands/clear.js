const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`❌ | Couldn't delete those messages, because you do not have the correct permission (MANAGE_MESSAGES) to do this!`);

    if (!args[0]) return message.channel.send(`❌ | Pls define the number of messages to delete!`);

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => { });

            message.channel.send(`✅ | ${message.author.tag} just **deleted ${amount - 1} messages**!`).then(msg => msg.delete(3000));

                const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
                  if(!logChannel)return;
            
                const clearLogEmbed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setTitle(`⚙️ | ${client.user.username} Logs`)
                .addField(`MESSAGE_DELETE`, `${message.author.tag} just **deleted ${amount - 1} messages**!`)
                .setFooter(`© Rex was made by Tsunami#6271`)
                logChannel.send(clearLogEmbed);
    } else {
        return message.channel.send(`❌ | Pls define the amount of messages to delete!`)
        .catch(error => message.reply(`❌ | Couldn't delete those messages because of: ${error}!`));
    }
  }

  module.exports.help = {
    name: "clear"
}