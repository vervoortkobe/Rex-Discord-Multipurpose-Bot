const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {
    
    if(!args[0]) return message.channel.send(`❌ | Pls enter a valid input to calculate!`);

    let resp;
    try {
        resp = math.eval(args.join(' '));
    } catch (e) {
        return message.channel.send(`❌ | Pls enter a valid input to calculate!`);
    }

    const calcEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🤔 | ${client.user.username} Calculate`)
    .addField(`📥 | Input`, `\`\`\`js\n${args.join(' ')}\`\`\``)
    .addField(`📤 | Output`, `\`\`\`js\n${resp}\`\`\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.channel.send(calcEmbed);
  }

  module.exports.help = {
    name: "calc"
}