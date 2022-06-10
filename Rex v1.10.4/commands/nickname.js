const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const nickname = args.join(" ");

    if(!message.member.hasPermission('CHANGE_NICKNAME')) return message.channel.send(`❌ | Couldn't change your nickname, because you do not have the correct permissions (CHANGE_NICKNAME) to do this!`);

    if(!nickname) {
      const nicknameUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Nickname`)
      .setDescription(`Usage: **${prefix}nickname <nickname>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      message.channel.send(nicknameUsageEmbed);
    }

    const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const nicknameLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`CHANGE_NICKNAME`, `${message.author.tag} just **changed his/her nickname to "${nickname}"**!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(nicknameLogEmbed);

    message.member.setNickname(nickname);
    message.channel.send(`✅ | Your nickname has successfully been set to "**${nickname}**"!`);
  }

  module.exports.help = {
    name: "nickname"
}