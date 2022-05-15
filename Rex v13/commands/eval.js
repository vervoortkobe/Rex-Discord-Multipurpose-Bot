const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const db = require("quick.db");
const moment = require("moment");

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

    if(message.author.id === "408289224761016332") {
        
      let cmd = args.join(" ");
      if(!cmd) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Please define a code to evaluate!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }
        
      if(cmd.toLowerCase().includes("token") || cmd.toLowerCase().includes("config.") || cmd.toLowerCase().includes("process.env")) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: That is forbidden!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      const clean = text => {
        if(typeof text === "string")
          return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
          else return text;
      }

      try {
        const code = args.slice(0).join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
      } catch(err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  }

module.exports.help = {
  name: "eval",
  aliases: ["evaluate"],
  category: "owner"
}