const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let rps = ["rock", "paper", "scissors"];
    let i;
  
    if(!rps.includes(args[0])) return message.channel.send(`❌ | Please choose **rock**, **paper or **scissors**!`);
    if(args[0].includes("rock")) {
    i = 2;
    }
    if(args[0].includes("scissors")) {
    i = 1;
    }
    if(args[0].includes("paper")) {
    i = 0;
    }
    if(rps[i]) {
  
    let comp = Math.floor((Math.random() * 3) + 1);
    let comp_res = parseInt(comp) - parseInt("1");
    let comp_val = rps[parseInt(comp_res)];
    
      if(i === comp_res) {
        return message.channel.send(`🎉 | You chose **${args[0]}**, I chose **${comp_val}**!`); 
    }
    if(i > comp_res) {
      return message.channel.send(`🎉 | You chose **${args[0]}**, I chose **${comp_val}**!`);
    } 
    if(i < comp_res) {
      return message.channel.send(`🎉 | You chose **${args[0]}**, I chose **${comp_val}**!`);
    }
  }
}

module.exports.help = {
    name: "rps"
}