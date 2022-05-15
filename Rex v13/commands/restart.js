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

    if(message.author.id === "408289224761016332") {

      message.delete();

      const restartEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`${v} **|** ***Restarting the bot in \`3 seconds\`...\n» This might take some time!***`)
      message.channel.send({ embeds: [ restartEmbed ]});
      
      setTimeout(() => {
        process.kill(1);
        exec("node index.js", function (error, stdout, stderr) {
          console.log("stdout: " + stdout);
          console.log("stderr: " + stderr);
          if(err) console.log("exec error: " + err);
        });
      }, 3000);
    }
  }

module.exports.help = {
  name: "restart",
  aliases: [],
  category: "owner"
}