const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const loading = client.emojis.cache.get("615988699796340768");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!message.channel.name.startsWith(`ticket-`)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't use this command outside of a ticket channel!***`)
      return message.channel.send(errorEmbed);
    }

    message.delete();

    const loadingEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setDescription(`${loading} **|** ***The transcript is being created...***`)
    message.channel.send(loadingEmbed)
    .then(m => m.delete({ timeout: 5000 }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    message.channel.messages.fetch()
    .then(messages => {

      var text;

      for(let [key, value] of messages) {
        const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");

        let avatars = "<img src=" + value.author.displayAvatarURL() + ">";

        if(value.embeds[0]) {
          text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
        }

        text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
      }
  
      let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
      let body = `<head><title>Ticket Transcript • #${message.channel.name}</title><link rel="icon" type="image/png" href=${message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
      let output = body.replace("undefined", "<br>");
  
      fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
        if(err) console.log(err);
      });

      setTimeout(() => {
  
        const transcriptEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`📝 | Transcript`)
        .setDescription(`${v} **| ${message.author}** created a **transcript** of ticket **#${message.channel.name}**!\n**» **Check the file below this message. ⬇️`)
        message.channel.send(transcriptEmbed);
        message.channel.send({ files: ["./ticket-transcript.html"] });

        let logChannel = message.guild.channels.cache.find(c => c.name === "ticket-logs");
        if(logChannel) {
          const transcriptLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setDescription(`${v} **| ${message.author}** created a **transcript** of ticket **#${message.channel.name}**!\n**» **Check the file below this message. ⬇️`)
          logChannel.send(transcriptLogEmbed);
          logChannel.send({ files: ["./ticket-transcript.html"] });
        }
      }, 500);
    });
  }

  module.exports.help = {
    name: "transcript",
    aliases: [],
    category: "tickets"
}