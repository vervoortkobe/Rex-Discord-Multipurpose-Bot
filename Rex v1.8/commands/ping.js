const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const m = await message.channel.send("⚙️ | Calculating...");
    m.edit(`🏓 | **Pong!!!**\n🤖 | Latency is **${m.createdTimestamp - message.createdTimestamp}ms**,\n🖥️ | Discord API heartbeat is **${Math.round(client.ping)}ms**!`);
  }

  module.exports.help = {
    name: "ping"
}