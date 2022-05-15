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

    if(!args[0]) {
      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Hack`)
      .setDescription(`${x} **|** ***Usage: ${prefix}hack <@member/member ID>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
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

    message.channel.send(`\`\`\`css\n[🐱‍💻 | ${message.author.tag} successfully launched an attack on ${member.user.tag}!]\n\`\`\``)
    const m = await message.channel.send(`\`[Connecting to the database...]\``);
    m.edit(`\`[Connecting.]\``);
    m.edit(`\`[Connecting..]\``);
    m.edit(`\`[Connecting...]\``);
    m.edit(`\`[Connecting]\``);
    m.edit(`\`[Connecting.]\``);
    m.edit(`\`[Connecting..]\``);
    m.edit(`\`[Connecting...]\``);
    m.edit(`\`\`\`css\n[🐱‍💻 | Successfully connected to the database!]\n\`\`\``);
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
    m.edit(`\`\`\`css\n[🐱‍💻 | Successfully cracked ${member.user.tag}'s account!]\n\`\`\``);
    m.edit(`\`\`\`css\n[🐱‍💻 | ${member.user.tag} was successfully hacked by ${message.author.tag}!]\n\`\`\``);
  }

  module.exports.help = {
    name: "hack",
    aliases: [],
    category: "fun"
}