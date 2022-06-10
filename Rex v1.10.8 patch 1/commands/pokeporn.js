const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let replies = ["https://i.redd.it/pcl5ae66kn641.jpg", "https://i.redd.it/a1d5yu4f9r641.jpg", "https://i.redd.it/ysgthmyy40741.jpg", "https://i.redd.it/y83yu8m0lv641.jpg", "https://i.redd.it/p5wmfk4d40741.jpg", "https://i.redd.it/5eevtotr50741.jpg", "https://i.redd.it/4p5p3qusq0741.jpg", "https://i.redd.it/72gr6dece8741.jpg", "https://i.redd.it/izbbu4hm2b741.png", "https://i.redd.it/4in5zngme9741.jpg", "https://i.redd.it/q7idrj6p71741.png", "https://i.redd.it/anrsuzjdx1741.jpg", "https://i.redd.it/sgo4jh1dqz641.png", "https://i.redd.it/m02hzb1227741.jpg", "https://i.redd.it/5il794w2ec741.jpg", "https://i.redd.it/7ihkcea6jc741.jpg", "https://i.redd.it/qz6qcvrbg9741.jpg", "https://i.redd.it/ruq8gass46641.jpg", "https://i.redd.it/znbqlovj46641.jpg", "https://i.redd.it/mkha53ewj5641.png", "https://i.redd.it/5k3f8cw5q8641.jpg", "https://i.redd.it/a27pkczs29641.jpg", "https://i.redd.it/dsfvxipe99641.jpg", "https://i.redd.it/5yygaema99641.jpg", "https://i.redd.it/ynwz30hfib641.jpg", "https://i.redd.it/28stb20kab641.jpg", "https://i.redd.it/55pu4c8i2k641.jpg", "https://i.redd.it/2spdf8v5pu641.jpg", "https://i.redd.it/8kwzkd4oe1741.jpg", "https://i.redd.it/p9byvz50x8741.jpg", "https://i.redd.it/n0q1jg8587741.jpg", "https://i.redd.it/e2uy1mr3vw741.jpg", "https://i.redd.it/z8t8meq4dc741.jpg", "https://i.redd.it/43sxnlsedc741.jpg", "https://i.redd.it/sddcuvfsi9741.jpg", "https://i.redd.it/k4widz4ben741.png"]
    let result = Math.floor((Math.random() * replies.length));

    if(message.channel.nsfw === false) return message.channel.send(`❌ | Couldn't generate an nsfw image, because this isn't an nsfw channel!`);
    if(message.channel.nsfw === true){

    message.channel.send({file: replies[result]});
    }
  }

  module.exports.help = {
    name: "pokeporn"
}