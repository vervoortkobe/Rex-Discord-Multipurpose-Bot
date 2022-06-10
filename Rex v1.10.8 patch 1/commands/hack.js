const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
 
    if (!member) {
      member = message.author;
    }

    message.delete();
    
    let replies1 = ["[1%]", "[2%]", "[3%]", "[4%]", "[5%]", "[6%]", "[7%]", "[8%]", "[9%]", "[10%]", "[11%]", "[12%]", "[13%]", "[14%]", "[15%]", "[16%]", "[17%]", "[18%]", "[19%]", "[20%]"]
    let replies2 = ["[21%]", "[22%]", "[23%]", "[24%]", "[25%]", "[26%]", "[27%]", "[28%]", "[29%]", "[30%]", "[31%]", "[32%]", "[33%]", "[34%]", "[35%]", "[36%]", "[37%]", "[38%]", "[39%]", "[40%]", "[41%]", "[42%]", "[43%]", "[44%]", "[45%]", "[46%]", "[47%]", "[48%]", "[49%]", "[50%]", "[51%]", "[52%]", "[53%]", "[54%]", "[55%]", "[56%]", "[57%]", "[58%]", "[59%]", "[60%]"]
    let replies3 = ["[61%]", "[62%]", "[63%]", "[64%]", "[65%]", "[66%]", "[67%]", "[68%]", "[69%]", "[70%]", "[71%]", "[72%]", "[73%]", "[74%]", "[75%]", "[76%]", "[77%]", "[78%]", "[79%]", "[80%]"]
    let result1 = Math.floor((Math.random() * replies1.length));
    let result2 = Math.floor((Math.random() * replies2.length));
    let result3 = Math.floor((Math.random() * replies3.length));
    let p1 = replies1[result1];
    let p2 = replies2[result2];
    let p3 = replies3[result3];

    message.channel.send(`\`\`\`css\n[✅ | ${message.author.tag} just successfully launched an attack on ${member.tag}!]\n\`\`\``)
    const m = await message.channel.send(`\`[Connecting to the database...]\``);
    m.edit(`\`[Connecting.]\``);
    m.edit(`\`[Connecting..]\``);
    m.edit(`\`[Connecting...]\``);
    m.edit(`\`[Connecting]\``);
    m.edit(`\`[Connecting.]\``);
    m.edit(`\`[Connecting..]\``);
    m.edit(`\`[Connecting...]\``);
    m.edit(`\`\`\`css\n[✅ | Successfully connected to the database!]\n\`\`\``);
    m.edit(`\`[Sending vulnerable packets...]\``)
    m.edit(`\`[Sending packets.]\``);
    m.edit(`\`[Sending packets..]\``);
    m.edit(`\`[Sending packets...]\``);
    m.edit(`\`[Sending packets]\``);
    m.edit(`\`[Sending packets.]\``);
    m.edit(`\`[Sending packets..]\``);
    m.edit(`\`[Sending packets...]\``);
    m.edit(`\`[Cracking account...]\``);
    m.edit(`\`[🔲🔳🔳🔳🔳]\n${p1}\``);
    m.edit(`\`[🔲🔲🔲🔳🔳]\n${p2}\``);
    m.edit(`\`[🔲🔲🔲🔲🔳]\n${p3}\``);
    m.edit(`\`\`\`css\n[🔲🔲🔲🔲🔲]\n[100%]\n\`\`\``);
    m.edit(`\`\`\`css\n[✅ | Successfully cracked ${member.tag}'s account!]\n\`\`\``);
    m.edit(`\`\`\`css\n[✅ | ${member.tag} was successfully hacked by ${message.author.tag}!]\n\`\`\``);
  }

  module.exports.help = {
    name: "hack"
}