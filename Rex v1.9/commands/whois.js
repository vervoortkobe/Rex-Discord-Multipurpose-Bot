const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
      };

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);
 
    if (!memberToFind) {
          return message.channel.send(`❌ | Pls mention a valid member of this server!`);
      }

      let whoisEmbed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setTitle(`👤 | ${client.user.username} Whois`)
          .setThumbnail(memberToFind.user.avatarURL)
          .addField(`User Name`, memberToFind.user.tag, true)
          .addField(`Account Creation Date`, `${memberToFind.user.createdAt} (${checkDays(memberToFind.user.createdAt)})`, true)
          .addField(`Server Join Date`, message.guild.members.find('id', memberToFind.id).joinedAt, true)
          .addField(`User ID`, memberToFind.id, true)
          .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
          .setTimestamp()
      message.channel.send(whoisEmbed);
}

module.exports.help = {
    name: "whois"
}