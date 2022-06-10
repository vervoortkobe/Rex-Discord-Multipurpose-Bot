const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const botchangelogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤖 | ${client.user.username} Botchangelog`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find my botchangelog:`)
    .addField(`Version`, `${client.user.username} v1.10.6`, true)
    .addField(`✅ | New/Fixed Functions`, `✅ | Added ${prefix}commandlist\n✅ | Added ${prefix}youtube\n✅ | Fixed ${prefix}prefix\n✅ | Updated the [site](http://rexbot.ga)\n✅ | Added ${prefix}teamtrees\n✅ | Added ${prefix}report\n✅ | Added ${prefix}apply\n✅ | Updated ${prefix}poll\n✅ | Updated ${prefix}yesno\n✅ | Added ${prefix}onetwo\`\n✅ | Added ${prefix}rex-msglogs\`\n✅ | Added ${prefix}joinleave\``, true)
    .addField(`🔜 | Soon`, `🔜 | *None*`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(botchangelogEmbed);
  }

  module.exports.help = {
    name: "botchangelog"
}