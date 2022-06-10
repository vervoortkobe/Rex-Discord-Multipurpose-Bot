const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const arEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | Setup ${client.user.username} Autorole Module`)
    .setDescription('To let the autorole module work, you have to make sure the name of the role the bot should automatically give to new members **is 1 of the following terms:** `Member, member, MEMBER, Members, members, MEMBERS`**!**')
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(arEmbed);
  }

  module.exports.help = {
    name: "autorole"
}