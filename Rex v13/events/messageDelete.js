const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, delMsg) => {

    if(!delMsg.partial) {

      const msglogChannel = delMsg.guild.channels.cache.find(c => c.name === `rex-msglogs`);
      if(msglogChannel) {
        if(delMsg.content === "") return;

        if(delMsg.length > 1000) {
        const msgdelLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(delMsg.author.displayAvatarURL())
        .setDescription(`**» MESSAGE_DELETE:**\nA message of **${delMsg.author.tag} in ${delMsg.channel} was deleted**!\n**» Deleted Message:** \`\`\`This message was too long to display!\`\`\``)
        return msglogChannel.send({ embeds: [ msgdelLogEmbed ]});
        }

        let delmsgcontent;
        if(delMsg.content) {
        delmsgcontent = delMsg.content;
        } else {
        delmsgcontent = "Unknown Message";
        }

        const msgdelLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(delMsg.author.displayAvatarURL())
        .setDescription(`**» MESSAGE_DELETE:**\nA message of **${delMsg.author.tag} in ${delMsg.channel} was deleted**!\n**» Deleted Message:** \`\`\`${delmsgcontent}\`\`\``)
        msglogChannel.send({ embeds: [ msgdelLogEmbed ]});
      }
    }
  }

  module.exports.help = {
    name: "messageDelete"
}