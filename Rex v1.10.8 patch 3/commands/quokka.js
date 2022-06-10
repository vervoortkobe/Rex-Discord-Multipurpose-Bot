const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/626394754908684298/quokka-up-close--s--rohrlach-flickr.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394727280803840/57159-istock-486456250.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394705705435157/Quokka.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394663980630026/quokka.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394651422883884/rguiv7xysbg21.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394583399530517/c4763839b968e520f2ec2ee6e3f9fa50.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394564357259284/quokka-glimlach.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394266033324042/ECLIrxrXUAABJGl.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394222248984588/1488330286332.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394220680183828/Happy-quokka.png", "https://cdn.discordapp.com/attachments/614912483865526275/626393914634403860/Quokka_Sam-West.png"];
    let result = Math.floor((Math.random() * replies.length));

    const quokkaEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🐿 | ${client.user.username} Quokka`)
    .setImage(replies[result])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(quokkaEmbed);
  }

  module.exports.help = {
    name: "quokka"
}