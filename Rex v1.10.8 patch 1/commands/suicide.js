const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let replies = ["https://cdn.discordapp.com/attachments/601509635375104015/614908524744409089/apes.gif", "https://cdn.discordapp.com/attachments/601509635375104015/614908271958163495/suicide.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617079457420804131/giphy.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617079457273872397/source.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617079444942880769/giphy1.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617079438160429142/tumblr_mdga5m13z21r9xjxoo1_500.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617080777146105907/unknown.png", "https://cdn.discordapp.com/attachments/614912483865526275/617081178641661991/Idontwanttoliveonthisplanetanymore_863fca9fdea2f8cccfb34278a0ebf17b.gif", "https://cdn.discordapp.com/attachments/614912483865526275/617081803181785149/suicide.gif"];
    let result = Math.floor((Math.random() * replies.length));

    message.channel.send(`💀🔫 | <@${message.author.id}> just commited suicide!`);

    const suicideEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`💀🔫 | ${client.user.username} Suicide`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(replies[result])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(suicideEmbed);
  }

  module.exports.help = {
    name: "suicide"
}