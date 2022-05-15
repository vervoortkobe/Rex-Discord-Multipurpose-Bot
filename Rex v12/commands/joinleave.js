const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    
    const enabled = client.emojis.cache.get("792517063918223380");
    const disabled = client.emojis.cache.get("792517072956817409");

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
      .setDescription(`${x} **|** ***I couldn't set the join-leave channel for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0]) {
      let jlchannels = JSON.parse(fs.readFileSync("./jlchannels.json", "utf-8"));
      
      let text;
      if(!jlchannels[message.guild.id]) {
        text = `${disabled} \`Not configured yet\``;
      } else {
        let jlchannel = jlchannels[message.guild.id].jlchannels;
        text = `${enabled} \`${jlchannel}\``;
      }
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Join-Leave Channel`)
      .setDescription(`${x} **|** ***Usage: ${prefix}joinleave set [#channel/channel ID]***\n**» Join-Leave:** ${text}`)
      .setFooter(`<> = required | [] = optional`)
      return message.channel.send(usageEmbed);
    }
  
    if(args[0] === `set`) {
      if(args[1]) {

        var channameid;
        if(args[1].includes("<") || args[1].includes("@") || args[1].includes("#") ||args[1].includes("&") || args[1].includes(">")) {
          channameid = args[1];
        } else {
          channameid = `<#${args[1]}>`;
        }
  
        let jlchannels = JSON.parse(fs.readFileSync("./jlchannels.json", "utf-8"));
  
        jlchannels[message.guild.id] = {
          jlchannels: args[1].replace("<", "").replace("@", "").replace("&", "").replace("#", "").replace(">", "")
        }
  
        fs.writeFile("./jlchannels.json", JSON.stringify(jlchannels), (err) => {
          if(err) console.log(err);
        });
  
        const joinleaveEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`⚙️ | Join-Leave Channel`)
        .setDescription(`${v} **|** ***The join-leave channel for this server has been set to: ${channameid}***`)
        message.channel.send(joinleaveEmbed)
        .then(message.react("⚙️"));
  
        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const joinleaveLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`**» CONFIG_JOIN_LEAVE_CHANNEL:**\nThe **join-leave channel** for this server has been set to: **${channameid}**`)
          logChannel.send(joinleaveLogEmbed);
        }

      } else {
  
        let jlchannels = JSON.parse(fs.readFileSync("./jlchannels.json", "utf-8"));
  
        jlchannels[message.guild.id] = {
          jlchannels: message.channel.id
        }
  
        fs.writeFile("./jlchannels.json", JSON.stringify(jlchannels), (err) => {
          if(err) console.log(err);
        });
  
        const joinleaveEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`⚙️ | Join-Leave Channel`)
        .setDescription(`${v} **|** ***The join-leave channel for this server has been set to: ${message.channel}***`)
        message.channel.send(joinleaveEmbed)
        .then(message.react("⚙️"));
  
        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const joinleaveLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`**» CONFIG_JOIN_LEAVE_CHANNEL:**\nThe **join-leave channel** for this server has been set to: **${message.channel}**`)
          logChannel.send(joinleaveLogEmbed);
        }
      }
    }
  }

  module.exports.help = {
    name: "joinleave",
    aliases: ["jl"],
    category: "config"
}