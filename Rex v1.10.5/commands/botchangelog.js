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
    .setTitle(`⚙️ | ${client.user.username} Botchangelog`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find my botchangelog:`)
    .addField(`Version`, `${client.user.username} v1.10.5`, true)
    .addField(`✅ | New/Fixed Functions`, `✅ | Added ${prefix}tempban\n✅ | Added ${prefix}templock\n✅ | Added ${prefix}tempmute\n✅ | Added ${prefix}supportus\n✅ | Added ${prefix}howgay`, true)
    .addField(`🔜 | Soon`, `🔜 | *None*`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(botchangelogEmbed);
  }

  module.exports.help = {
    name: "botchangelog"
}