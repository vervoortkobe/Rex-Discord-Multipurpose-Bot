const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args, notifier) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't set the YT notification channel for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0] || !args[1] || args[1].includes("/c/")) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | YT Notification Channel`)
        .setDescription(`${x} **|** ***Usage: ${prefix}ytnotification set <YT channel URL/YT channel ID> (<#channel/channel ID>)***
        \n**» ▶ | Where can I find the YT channel URL/ID?:** \`https://www.youtube.com/channel/<YT channel ID>\`
        `)
        .setFooter(`<> = required | [] = optional`)
        return message.channel.send(usageEmbed);
      }
  
      if(args[0] === `set`) {
        if(args[2]) {

          var ytchanid;
          if(args[1].includes("https://") || args[1].includes("www.") || args[1].includes("youtu.be") || args[1].includes("youtube.com") || args[1].includes("/channel/")) {
            ytchanid = args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "");
          } else {
            ytchanid = args[1];
          }

          var channameid;
          if(args[2].includes("<") || args[2].includes("@") || args[2].includes("#") ||args[2].includes("&") || args[2].includes(">")) {
            channameid = args[2];
          } else {
            channameid = `<#${args[2]}>`;
          }
    
          let ytchannels = JSON.parse(fs.readFileSync("./ytchannels.json", "utf-8"));
    
          ytchannels[args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "")] = {
            ytchannels: args[2].replace("<", "").replace("@", "").replace("&", "").replace("#", "").replace(">", "")
          }
    
          fs.writeFile("./ytchannels.json", JSON.stringify(ytchannels), (err) => {
            if(err) console.log(err);
          });
    
          const ytnotiEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setAuthor(`⚙️ | YT Notification Channel`)
          .setDescription(`${v} **|** ***The YT notification channel for this server has been set to: ${channameid}, for the YT channel with ID: \`${ytchanid}\`***`)
          message.channel.send(ytnotiEmbed)
          .then(message.react("⚙️"));
    
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const ytnotiLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(mess)
            .setDescription(`**» CONFIG_YT_NOTIFICATION_CHANNEL:**
            \nThe **YT notification channel** for this server has been set to: **${channameid}**, for the **YT channel with ID:** \`${ytchanid}\`!
            `)
            logChannel.send(ytnotiLogEmbed);
          }

          notifier.subscribe(`${ytchanid}`);

        } else {
          
          var ytchanid;
          if(args[1].includes("https://") || args[1].includes("www.") || args[1].includes("youtu.be") || args[1].includes("youtube.com") || args[1].includes("/channel/")) {
            ytchanid = args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "");
          } else {
            ytchanid = args[1];
          }
    
          let ytchannels = JSON.parse(fs.readFileSync("./ytchannels.json", "utf-8"));
    
          ytchannels[args[1].replace("https://", "").replace("www.", "").replace("youtu.be", "").replace("youtube.com", "").replace("/channel/", "")] = {
            ytchannels: message.channel.id
          }
    
          fs.writeFile("./ytchannels.json", JSON.stringify(ytchannels), (err) => {
            if(err) console.log(err);
          });
    
          const ytnotiEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setAuthor(`⚙️ | YT Notification Channel`)
          .setDescription(`${v} **|** ***The YT notification channel for this server has been set to: ${message.channel}, for the YT channel with ID: \`${ytchanid}\`***`)
          message.channel.send(ytnotiEmbed)
          .then(message.react("⚙️"));
    
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const ytnotiLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`**» CONFIG_YT_NOTIFICATION_CHANNEL:**
            \nThe **YT notification channel** for this server has been set to: **${message.channel}**, for the **YT channel with ID:** \`${ytchanid}\`!
            `)
            logChannel.send(ytnotiLogEmbed);
          }

          notifier.subscribe(`${ytchanid}`);
        }
      }
    }

  module.exports.help = {
    name: "ytnotification",
    aliases: ["ytnoti"],
    category: "config"
}
