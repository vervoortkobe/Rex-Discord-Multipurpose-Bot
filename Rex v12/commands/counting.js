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

    if(!message.member.permissions.has("MANAGE_MESSAGES")) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't start a counting game in this channel, you don't have the correct permissions (MANAGE_CHANNELS) to do this!***`)
      return message.channel.send(errorEmbed);
    }

    if(!args[0] || !args[0] === "start" && !args[0] === "stop") {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Counting`)
      .setDescription(`${x} **|** ***Usage: ${prefix}counting <start/stop>***`)
      return message.channel.send(usageEmbed);
    }

    if(args[0] === "start") {

      let countings = JSON.parse(fs.readFileSync("./countings.json", "utf-8"));
      if(!countings[message.channel.id]) {

        message.delete();

        countings[message.channel.id] = {
          status: "start",
          count: 0
        }

        fs.writeFile("./countings.json", JSON.stringify(countings), (err) => {
          if(err) console.log(err);
        });

        const countingEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`🔢 | Counting`)
        .setDescription(`${v} **|** ***A counting game has been started in this channel!***\n**»** ***Type the number that comes after \`0\`!***`)
        message.channel.send(countingEmbed)
        .then(m => m.react("🔢"));
      }

      if(countings[message.channel.id].status === "stop") {

        message.delete();

        let count = countings[message.channel.id].count;

        countings[message.channel.id] = {
          status: "start",
          count: count
        }

        fs.writeFile("./countings.json", JSON.stringify(countings), (err) => {
          if(err) console.log(err);
        });

        const countingEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`🔢 | Counting`)
        .setDescription(`${v} **|** ***A counting game has been started in this channel!***\n**»** ***Type the number that comes after \`${count}\`!***`)
        message.channel.send(countingEmbed)
        .then(m => m.react("🔢"));
      } else {

        message.delete();

        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`🔢 | Counting`)
        .setDescription(`${x} **|** ***There's already a counting game in progress in this channel!***\n**»** ***To stop the ongoing counting game, please type \`${prefix}counting stop\`!***`)
        message.channel.send(errorEmbed)
        .then(m => m.delete({ timeout: 5000 }));
      }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////

    if(args[0] === "stop") {
      
      let countings = JSON.parse(fs.readFileSync("./countings.json", "utf-8"));
      if(!countings[message.channel.id]) {

        message.delete();

        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`🔢 | Counting`)
        .setDescription(`${x} **|** ***There isn't yet a counting game in progress in this channel!***\n**»** ***To start a counting game, please type \`${prefix}counting start\`!***`)
        message.channel.send(errorEmbed)
        .then(m => m.delete({ timeout: 5000 }));
      }

      if(countings[message.channel.id].status === "start") {

        message.delete();

        let count = countings[message.channel.id].count;

        countings[message.channel.id] = {
          status: "stop",
          count: count
        }

        fs.writeFile("./countings.json", JSON.stringify(countings), (err) => {
          if(err) console.log(err);
        });

        const countingEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`🔢 | Counting`)
        .setDescription(`${v} **|** ***The counting game has been stopped in this channel!***\n**»** ***To start the counting game again, please type \`${prefix}counting start\`!***`)
        message.channel.send(countingEmbed)
        .then(m => m.react("🔢"));
      } else {

        message.delete();

        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`🔢 | Counting`)
        .setDescription(`${x} **|** ***There isn't yet a counting game in progress in this channel!***\n**»** ***To start a counting game, please type \`${prefix}counting start\`!***`)
        message.channel.send(errorEmbed)
        .then(m => m.delete({ timeout: 5000 }));
      }
    }
  }

  module.exports.help = {
    name: "counting",
    aliases: [],
    category: "fun"
}