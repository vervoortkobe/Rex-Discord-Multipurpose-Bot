const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, oldMsg, newMsg) => {

    if(!oldMsg.partial) {

      if(newMsg.author.id === client.user.id) return;

      const msglogChannel = newMsg.guild.channels.cache.find(c => c.name === `rex-msglogs`);
      if(msglogChannel) {
        if(oldMsg.content === "" || newMsg.content === "" || oldMsg.content === newMsg.content) return;

        let oldmsg;
        let newmsg;
        if(oldMsg.length > 1000) oldmsg = `This message was too long to display!`;
        else oldmsg = oldMsg.content;
        if(newMsg.length > 1000) newmsg = `This message was too long to display!`;
        else newmsg = newMsg.content;

        msgupdEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(newMsg.author.displayAvatarURL())
        .setDescription(`**» MESSAGE_UPDATE:**\nA ***[message](https://discord.com/channels/${newMsg.guild.id}/${newMsg.channel.id}/${newMsg.id})*** from **${newMsg.author} in ${newMsg.channel}** was **edited**!\n**» Old Message:** \`\`\`${oldmsg}\`\`\`\n**» New Message:** \`\`\`${newmsg}\`\`\``)
        msglogChannel.send({ embeds: [ msgupdEmbed ]});
      }
    }
  }

  module.exports.help = {
    name: "messageUpdate"
}