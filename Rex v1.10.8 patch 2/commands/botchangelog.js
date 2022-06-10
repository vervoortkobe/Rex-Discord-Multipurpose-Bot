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
    .addField(`Version`, `${client.user.username} v1.10.8`, true)
    .addField(`✅ | New/Fixed Functions`, `✅ | Updated ${prefix}level\n✅ | Added ${prefix}ship\n✅ | Updated ${prefix}hack\n✅ | Removed ${prefix}nsfwneko (against Discord's ToS: nude anime minor img's)\n✅ | Fixed some minor bugs\n✅ | Added ${prefix}announce\n✅ | Added ${prefix}hippo\n✅ | Added ${prefix}binary\n✅ | Added ${prefix}botstats\n✅ | Added AUTOMOD\n✅ | Added ${prefix}bugreport\n✅ | Added ${prefix}suggest\n✅ | Added ${prefix}pokeporn\n✅ | Updated ${prefix}autorole\n✅ | Added ${prefix}invitelb\n✅ | Added ${prefix}pickcolor`, true)
    .addField(`🔜 | Soon`, `🔜 | *None*`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(botchangelogEmbed);
  }

  module.exports.help = {
    name: "botchangelog"
}