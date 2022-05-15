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

    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't set the ticket category for this server, because I don't have permissions to manage channels!***`)
      return message.channel.send(errorEmbed);
    }

    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't set the closed category for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    let catnameid = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);

    if(!args[0] || !args[1] || !catnameid) {

      let closedcats = JSON.parse(fs.readFileSync("./closedcats.json", "utf-8"));
      
      let text;
      if(!closedcats[message.guild.id]) {
        text = `${disabled} \`Not configured yet\``;
      } else {
        let closedcat = closedcats[message.guild.id].closedcats;
        let thecatname = message.guild.channels.cache.get(closedcat).name;
        text = `${enabled} \`#${thecatname}\``;
      }
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Closed Category`)
      .setDescription(`${x} **|** ***Usage: ${prefix}closedcat set <#category/category ID>***\n**» Closed Category:** ${text}`)
      return message.channel.send(usageEmbed);
    }

    if(args[0] === `set`) {

      let closedcats = JSON.parse(fs.readFileSync("./closedcats.json", "utf-8"));

      closedcats[message.guild.id] = {
        closedcats: catnameid.id
      }

      fs.writeFile("./closedcats.json", JSON.stringify(closedcats), (err) => {
        if(err) console.log(err);
      });

      const closedcatEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setAuthor(`⚙️ | Closed Category`)
      .setDescription(`${v} **|** ***The closed category for this server has been set to: ${catnameid}***`)
      message.channel.send(closedcatEmbed)
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(logChannel) {
        const closedcatLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setDescription(`**» CONFIG_CLOSED_CATEGORY:**\nThe **closed category** for this server has been set to: **${catnameid}**`)
        logChannel.send(closedcatLogEmbed);
      }
    }
  }

  module.exports.help = {
    name: "closedcat",
    aliases: [],
    category: "tickets"
}