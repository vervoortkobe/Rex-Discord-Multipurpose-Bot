const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${args[0]}`);
    let json = await res.json();

    let {data} = await fetch;

    fetch(`https://some-random-api.ml/pokedex?pokemon=${args[0]}`)
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    if(!args[0]) {
        const pokedexUsageEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`⚙️ | ${client.user.username} Pokedex`)
        .setDescription(`Usage: **${prefix}pokedex <pokemon>**`)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        message.channel.send(pokedexUsageEmbed);
    }

    if(data.error) return message.channel.send(`❌ | Couldn't fetch the pokemon! Does this pokemon exist?`);
    if(!data.family.evolutionStage === `0`) data.family.evolutionLine === `None`;

    const pokedexEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🐉 | ${client.user.username} Pokedex`)
    .setThumbnail(json.sprites.front_default)
    .addField(`Name`, `\`${data.name}\``)
    .addField(`Type`, `\`${data.type}\``)
    .addField(`Abilities`, `\`${data.abilities}\``)
    .addField(`Experience`, `\`${data.base_experience}\``)
    .addField(`Gender`, `\`${data.gender}\``)
    .addField(`Stats`, `Hp: \`${data.stats.hp}\`\nAttack: \`${data.stats.attack}\`\nDefense: \`${data.stats.defense}\`\nSpeed: \`${data.stats.speed}\`\nTotal: \`${data.stats.total}\``)
    .addField(`Evolution`, `Evolution Stage: \`${data.family.evolutionStage}\`\nEvolutions: \`${data.family.evolutionLine}\`\n`)
    .addField(`Description`, `\`${data.description}\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(pokedexEmbed);
    }
  )}

  module.exports.help = {
    name: "pokedex"
}