const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let memberToFind = message.mentions.members.first() || message.guild.members.get(args[0]);
 
    if (!memberToFind) {
          return message.channel.send(`❌ | Pls mention a valid member of this server!`);
      }

    message.delete();
    
    message.channel.send(`\`\`\`css\n[✅ | ${message.author.tag} just successfully launched an attack to ${memberToFind.user.tag}!]\n\`\`\``)
    const m = await message.channel.send(`\`[Connecting to the database...]\``);
    m.edit(`\`[Connecting.]\``);
    m.edit(`\`[Connecting..]\``);
    m.edit(`\`[Connecting...]\``);
    m.edit(`\`[Connecting]\``);
    m.edit(`\`[Connecting.]\``);
    m.edit(`\`[Connecting..]\``);
    m.edit(`\`[Connecting...]\``);
    m.edit(`\`\`\`css\n[✅ | Successfully connected to the database!]\n\`\`\``);
    m.edit(`\`[Sending vulnerable packets...]\``)
    m.edit(`\`[Sending packets.]\``);
    m.edit(`\`[Sending packets..]\``);
    m.edit(`\`[Sending packets...]\``);
    m.edit(`\`[Sending packets]\``);
    m.edit(`\`[Sending packets.]\``);
    m.edit(`\`[Sending packets..]\``);
    m.edit(`\`[Sending packets...]\``);
    m.edit(`\`[Cracking account...]\``);
    m.edit(`\`[🔲🔳🔳🔳🔳] [17%]\``);
    m.edit(`\`[🔲🔲🔲🔳🔳] [61%]\``);
    m.edit(`\`[🔲🔲🔲🔲🔳] [80%]]\``);
    m.edit(`\`\`\`css\n[🔲🔲🔲🔲🔲] [100%]\n\`\`\``);
    m.edit(`\`\`\`css\n[✅ | Successfully cracked ${memberToFind.user.tag}'s account!]\n\`\`\``);
    m.edit(`\`\`\`css\n[✅ | ${memberToFind.user.tag} was successfully hacked by ${message.author.tag}!]\n\`\`\``);
  }

  module.exports.help = {
    name: "hack"
}