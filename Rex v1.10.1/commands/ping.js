const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    const m = await message.channel.send("⚙️ | Calculating...");
    m.edit(`🏓 | **Pong!!!**\n🤖 | Latency: \`${m.createdTimestamp - message.createdTimestamp}\`ms,\n🖥️ | Discord API: \`${Math.round(client.ping)}\`ms!`);
  }

  module.exports.help = {
    name: "ping"
}