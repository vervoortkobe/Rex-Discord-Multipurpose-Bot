const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let replies = ["8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8=D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8==D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8===D", "8====D", "8====D", "8====D", "8====D", "8====D", "8====D", "8====D", "8=====D", "8=====D", "8=====D", "8=====D", "8=====D", "8=====D", "8======D", "8======D", "8======D", "8======D", "8======D", "8=======D", "8=======D", "8=======D", "8=======D", "8========D", "8========D", "8========D", "8=========D", "8=========D", "8==========D", ];
    let result = Math.floor((Math.random() * replies.length));

    const penissizeEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`8=D | ${client.user.username} Penis Size`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`${message.author.username}'s penis:\n${replies[result]}`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(penissizeEmbed)
  }

module.exports.help = {
  name: "penis"
}