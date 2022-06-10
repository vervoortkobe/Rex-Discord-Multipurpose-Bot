const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const botchangelogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Botchangelog`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find my botchangelog:`)
    .addField(`Version`, `${client.user.username} v1.10`, true)
    .addField(`✅ | New/Fixed Functions`, `✅ | Added ${prefix}kangooroo\n✅ | Added ${prefix}weapon\n✅ | Added ${prefix}trigger\n✅ | Added ${prefix}gay\n✅ | Added ${prefix}wasted\n✅ | Added ${prefix}greyscale\n✅ | Added ${prefix}invert`, true)
    .addField(`🔜 | Soon`, `🔜 | *None*`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(botchangelogEmbed);
  }

  module.exports.help = {
    name: "botchangelog"
}