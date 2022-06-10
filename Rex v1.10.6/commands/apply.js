const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let apply = args.join(' ');

    if(!args[0]) {
      const applyUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Apply`)
      .setDescription(`Usag: **${prefix}apply <your apply>**`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      return message.channel.send(applyUsageEmbed);
    }

    const applyChannel = message.guild.channels.find(c => c.name === `rex-apply`);
    if(!applyChannel) return message.channel.send(`❌ | I couldn't submit your apply, because the owner of this server doesn't want to let members apply or they forgot create an apply channel. To do this, pls send this command: \`${prefix}rex-apply\`!`);

    const applyEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`📥 | ${client.user.username} Apply`)
    .addField(`Applying User`, `<@${message.author.id}>`)
    .addField(`Apply`, apply)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    applyChannel.send(applyEmbed);
    
    message.delete();
    message.channel.send(`✅ | Your apply has been sent successfully! Pls be patient while the Staff team takes a look at it.`);

    const applyDmEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`📥 | ${client.user.username} Apply`)
    .setDescription(`**This is the apply you just sent!**`)
    .addField(`Applying User`, `<@${message.author.id}>`)
    .addField(`Apply`, apply)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.author.send(applyDmEmbed);
  }

  module.exports.help = {
    name: "apply"
}