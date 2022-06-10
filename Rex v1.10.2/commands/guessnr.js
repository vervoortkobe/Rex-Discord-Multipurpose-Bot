const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let rps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let i;
  
    if(!rps.includes(args[0])) return message.channel.send(`❌ | Please choose a number between **1-4**!`);
    if(args[0].includes("1")) {
    i = 1;
    }
    if(args[0].includes("2")) {
    i = 2;
    }
    if(args[0].includes("3")) {
    i = 3;
    }
    if(args[0].includes("4")) {
    i = 4;
    }

    if(rps[i]) {
  
    let comp = Math.floor((Math.random() * 3) + 1);
    let comp_res = parseInt(comp) - parseInt("1");
    let comp_val = rps[parseInt(comp_res)];
    
      if(i === comp_res) {
        return message.channel.send(`🎉 | You chose **${args[0]}**, It was **${comp_val}**! **You won!**`); 
    }
    if(i > comp_res) {
      return message.channel.send(`🤷 | You chose **${args[0]}**, It was **${comp_val}**! **You lost!**`);
    } 
    if(i < comp_res) {
      return message.channel.send(`🤷 | You chose **${args[0]}**, It was **${comp_val}**! **You lost!**`);
    }
  }
}

module.exports.help = {
    name: "guessnr"
}