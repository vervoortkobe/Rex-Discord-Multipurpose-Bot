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
  
    if(message.author.id == `408289224761016332`) {

      message.delete();
      
      const checkEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***I sent it in your dm, ${message.author}!***`)
      message.channel.send({ embeds: [ checkEmbed ]});
        
      let guilds = [];
      client.guilds.cache.forEach((guild) => {
        guilds.push(guild.name);
      });

      guilds.sort();

     let servers = '';
      guilds.forEach((guild) => {
        let s = client.guilds.cache.find(g => g.name === guild);
       servers = servers.concat(`\n${s.name} - ${s.id} - ${s.memberCount}`);
      });

      message.author.send(`\`\`\`md\n# Serverlist (${client.guilds.cache.size}): \`\`\`\n\`\`\`css\n${servers}\`\`\``);
    }
  }
  
  module.exports.help = {
    name: "serverlist",
    aliases: [],
    category: "owner"
}