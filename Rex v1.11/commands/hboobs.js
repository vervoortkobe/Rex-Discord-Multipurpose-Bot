const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    if(message.channel.nsfw === false) return message.channel.send(`❌ | Couldn't generate an nsfw image, because this isn't an nsfw channel!`);
    if(message.channel.nsfw === true){

    fetch('https://nekos.life/api/v2/img/tits')
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

      message.channel.send({file: data.url});
      })
    }
  }

  module.exports.help = {
    name: "hboobs"
}