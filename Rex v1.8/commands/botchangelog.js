const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const botchangelogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Botchangelog`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find my botchangelog:`)
    .addField(`Version`, `Rex v1.8`)
    .addField(`✅ | New/Fixed Functions`, `✅ | Added Level Category`)
    .addField(`🔜 | Soon`, `🔜 | None`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    message.channel.send(botchangelogEmbed);
  }

  module.exports.help = {
    name: "botchangelog"
}