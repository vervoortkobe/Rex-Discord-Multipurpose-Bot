const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let lvl = require("../lvl.json");

    if(!lvl[message.author.id]) {
        lvl[message.author.id] = {
            lvl: 0
        };
      }

    let member = message.mentions.members.first() ||  message.guild.members.get(args[0]);
      if(!member) {
        member = message.author
      }
    
    let uLvl = lvl[member.id].lvl;

    if (uLvl >= 0 && uLvl <= 1000) {
      xp = 0
    }
    if (uLvl >= 1000 && uLvl <= 2000) {
      xp = 1
    }
    if (uLvl >= 2000 && uLvl <= 3000) {
      xp = 2
    }
    if (uLvl >= 3000 && uLvl <= 4000) {
      xp = 3
    }
    if (uLvl >= 4000 && uLvl <= 5000) {
      xp = 4
    }
    if (uLvl >= 5000 && uLvl <= 6000) {
      xp = 5
    }
    if (uLvl >= 6000 && uLvl <= 7000) {
      xp = 6
    }
    if (uLvl >= 7000 && uLvl <= 8000) {
      xp = 7
    }
    if (uLvl >= 8000 && uLvl <= 9000) {
      xp = 8
    }
    if (uLvl >= 9000 && uLvl <= 10000) {
      xp = 9
    }
    if (uLvl >= 10000 && uLvl <= 11000) {
      xp = 10
    }
    if (uLvl >= 11000 && uLvl <= 12000) {
      xp = 11
    }
    if (uLvl >= 12000 && uLvl <= 13000) {
      xp = 12
    }
    if (uLvl >= 13000 && uLvl <= 14000) {
      xp = 13
    }
    if (uLvl >= 14000 && uLvl <= 15000) {
      xp = 14
    }
    if (uLvl >= 15000 && uLvl <= 16000) {
      xp = 15
    }
    if (uLvl >= 16000 && uLvl <= 17000) {
      xp = 16
    }
    if (uLvl >= 17000 && uLvl <= 18000) {
      xp = 17
    }
    if (uLvl >= 18000 && uLvl <= 19000) {
      xp = 18
    }
    if (uLvl >= 19000 && uLvl <= 20000) {
      xp = 19
    }
    if (uLvl >= 20000 && uLvl <= 21000) {
      xp = 20
    }
    if (uLvl >= 21000 && uLvl <= 22000) {
      xp = 21
    }
    if (uLvl >= 22000 && uLvl <= 23000) {
      xp = 22
    }
    if (uLvl >= 23000 && uLvl <= 24000) {
      xp = 23
    }
    if (uLvl >= 24000 && uLvl <= 25000) {
      xp = 24
    }
    if (uLvl >= 25000 && uLvl <= 26000) {
      xp = 25
    }
    if (uLvl >= 26000 && uLvl <= 27000) {
      xp = 26
    }
    if (uLvl >= 27000 && uLvl <= 28000) {
      xp = 27
    }
    if (uLvl >= 28000 && uLvl <= 29000) {
      xp = 28
    }
    if (uLvl >= 29000 && uLvl <= 30000) {
      xp = 29
    }
    if (uLvl >= 30000 && uLvl <= 31000) {
      xp = 30
    }
    if (uLvl >= 31000 && uLvl <= 32000) {
      xp = 31
    }
    if (uLvl >= 32000 && uLvl <= 33000) {
      xp = 32
    }
    if (uLvl >= 33000 && uLvl <= 34000) {
      xp = 33
    }
    if (uLvl >= 34000 && uLvl <= 35000) {
      xp = 34
    }
    if (uLvl >= 35000 && uLvl <= 36000) {
      xp = 35
    }
    if (uLvl >= 36000 && uLvl <= 37000) {
      xp = 36
    }
    if (uLvl >= 37000 && uLvl <= 38000) {
      xp = 37
    }
    if (uLvl >= 38000 && uLvl <= 39000) {
      xp = 38
    }
    if (uLvl >= 39000 && uLvl <= 40000) {
      xp = 39
    }
    if (uLvl >= 40000 && uLvl <= 41000) {
      xp = 40
    }
    if (uLvl >= 41000 && uLvl <= 42000) {
      xp = 41
    }
    if (uLvl >= 42000 && uLvl <= 43000) {
      xp = 42
    }
    if (uLvl >= 43000 && uLvl <= 44000) {
      xp = 43
    }
    if (uLvl >= 44000 && uLvl <= 45000) {
      xp = 44
    }
    if (uLvl >= 45000 && uLvl <= 46000) {
      xp = 45
    }
    if (uLvl >= 46000 && uLvl <= 47000) {
      xp = 46
    }
    if (uLvl >= 47000 && uLvl <= 48000) {
      xp = 47
    }
    if (uLvl >= 48000 && uLvl <= 49000) {
      xp = 48
    }
    if (uLvl >= 49000 && uLvl <= 50000) {
      xp = 49
    }
    if (uLvl >= 50000 && uLvl <= 51000) {
      xp = 50
    }

    if (message.author.id === `350602324479180802`) {
      lvlmode = `Donator/Premium (2x)`
    } else {
      lvlmode = `Normal`
    }

    let lvlEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🆙 | ${client.user.username} Level`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`You are **lvl ${xp}**!\nYou have **${uLvl} total xp**!`)
    .addField(`Level Mode`, `Your lvl mode is ${lvlmode}!`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(lvlEmbed);
  }

  module.exports.help = {
    name: "level"
}