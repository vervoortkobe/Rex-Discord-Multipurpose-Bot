const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(message.author.id === "408289224761016332") {
  
      let adminRole = message.guild.roles.cache.find(r => r.name ==="OP");

      if(message.member.roles.cache.has(adminRole)) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't give you the OP role, because you already have it!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      if(!adminRole) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't delete the OP role, because there is no OP role!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      message.delete();

      const checkEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***I deleted the OP role successfully!***`)
      message.channel.send({ embeds: [ checkEmbed ]});
      
      adminRole.delete();
    }
  }

  module.exports.help = {
    name: "deop",
    aliases: [],
    category: "owner"
}