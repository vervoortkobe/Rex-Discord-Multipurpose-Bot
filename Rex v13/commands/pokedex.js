const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    const pokeball = client.emojis.cache.get("811990944273924117");

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
      .setAuthor(`⚙️ | Pokédex`)
      .setDescription(`${x} **|** ***Usage: ${prefix}pokedex <Pokémon name>***`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

    let {data} = await fetch;

    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`);
    let json = await res.json();

    fetch(`https://some-random-api.ml/pokedex?pokemon=${args[0].toLowerCase()}`)
    .then(res => res.json()).then(data => {
      if(!data.name) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      if(data.error) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't fetch that pokemon! Does this pokemon exist?***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }
      if(!data.family.evolutionStage === `0`) data.family.evolutionLine === `None`;

      const pokedexEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setTitle(`${pokeball} | Pokédex`)
      .setThumbnail(json.sprites.front_default)
      .setDescription(`**» Pokémon Name:** \`${data.name}\`\n**» Type:** \`${data.type}\`\n**» Abilities:** \`${data.abilities}\`\n**» Experience:** \`${data.base_experience}\`\n**» Gender:** \`${data.gender}\`\n**» Stats:** **Hp:** \`${data.stats.hp}\`, **Attack:** \`${data.stats.attack}\`, **Defense:** \`${data.stats.defense}\`, **Speed:** \`${data.stats.speed}\`, **Total:** \`${data.stats.total}\`\n**» Evolution:** **Evolution Stage:** \`${data.family.evolutionStage}\`, **Evolutions:** \`${data.family.evolutionLine}\`\n**» Description:** \`${data.description}\``)
      message.channel.send({ embeds: [ pokedexEmbed ]})
      .then(message.react("🐉"));
    });
  }

  module.exports.help = {
    name: "pokedex",
    aliases: [],
    category: "fun"
}