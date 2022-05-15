const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");
const cooldown = new Set();
const cdtime = 1000;

module.exports.run = async (client, message) => {

    if(message.author.bot) return;
    if(message.channel.type === "DM") return;
  
    //CUSTOM PREFIXES
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    
    if(!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
        }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    //LEVELING
    if(!levels[message.author.id]) {
        levels[message.author.id] = {
        xp: 0
        }
    }
    let xp = levels[message.author.id].xp;

    levels[message.author.id] = {
        xp: xp + 1
    }
    fs.writeFile("./levels.json", JSON.stringify(levels), (err) => {
        if(err) console.log(err);
    });

    //LVL1
    if(xp === 1000) {
        let lvl = 1;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 1");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/2000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/2000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL2
    if(xp === 2000) {
        let lvl = 2;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 2");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {
            
            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/3000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/3000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL3
    if(xp === 3000) {
        let lvl = 3;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 3");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {
            
            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/4000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");
        
            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/4000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL4
    if(xp === 4000) {
        let lvl = 4;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 4");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/5000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/5000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL5
    if(xp === 5000) {
        let lvl = 5;
        
        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 5");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {
            
            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/6000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));
        
        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/6000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL6
    if(xp === 6000) {
        let lvl = 6;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 6");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {
            
            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/7000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/7000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL7
    if(xp === 7000) {
        let lvl = 7;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 7");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/8000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/8000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL8
    if(xp === 8000) {
        let lvl = 8;
    
        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 8");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/9000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/9000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL9
    if(xp === 9000) {
        let lvl = 9;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 9");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {
            
            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/10000\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/10000\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }
    //LVL10
    if(xp === 10000) {
        let lvl = 10;

        if(message.guild.id === "516227189251768330") {
        let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 10");
        if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
        message.member.roles.add(lvlrole);
        }

        let {data} = await fetch;

        fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
        .then(res => res).then(data => {
        if(data.error) {

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/~\` xp`)
            message.channel.send({ embeds: [ lvlupEmbed ]})
            .then(message.react("🆙"));

        } else {

            let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

            const lvlupEmbed = new Discord.MessageEmbed()
            .setColor(0xffb900)
            .setAuthor(`🆙 | Level Up`)
            .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/~\` xp`)
            .setImage("attachment://level.png")
            message.channel.send({ embeds: [ lvlupEmbed ], files: [ levelpic ]})
            .then(message.react("🆙"));
        }
        });
    }

    //AUTOMOD ANTISWEAR
    let swearwords = ["fuck", "sex", "seks", "porn", "bitch", "asshole", "cunt", "nigger", "nigga", "nicker", "dick", "kanker", "kkr", 
    "cancer", "pedo", "tering", "tyfus", "godverdomme", "neger", "mongool", "mongol", "aids", "autist", "downie", "klootzak", "eikel"];

    swearwords.forEach(sw => {
        if(message.content.toLowerCase().includes(sw)) {
        let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
        if(!automods[message.guild.id]) {
            automods[message.guild.id] = {
            antiswear: "disable",
            antispam: "disable",
            antiinvites: "disable",
            antiraid: "disable"
            }
        }
        let antiswear = automods[message.guild.id].antiswear;
        
        let v = client.emojis.cache.get("615983179341496321");

        if(antiswear === "enable") {
            if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {

            message.delete();

            const automodEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***AUTOMOD warned ${message.author}, because of swearing!***`)
            message.channel.send({ embeds: [ automodEmbed ]});

            const automodPmEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⛑️ | Automod`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`AUTOMOD warned you in \`${message.guild.name}\`, because of \`swearing\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Warn\`\n**» Reason:** \`Swearing\`\n**» Swear:** ||\`${message.content}\`||`)
            message.member.send({ embeds: [ automodPmEmbed ]})
            .catch(err => console.log(err));

            const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
            if(logChannel) {
                const automodLogEmbed = new Discord.MessageEmbed()
                .setColor(0x03a9f4)
                .setAuthor(`⚙️ | Logs`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**» AUTOMOD:**\n**AUTOMOD warned ${message.author}**, because of **swearing**!\n**» Swear:** ||\`${message.content}\`||`)
                logChannel.send({ embeds: [ automodLogEmbed ]});
            }
            }
        }
        }
    });

    //AUTOMOD ANTISPAM
    let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
    if(!automods[message.guild.id]) {
        automods[message.guild.id] = {
        antiswear: "disable",
        antispam: "disable",
        antiinvites: "disable",
        antiraid: "disable"
        }
    }
    let antispam = automods[message.guild.id].antispam;

    if(antispam === "enable") {
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
        if(!message.channel.name.includes("spam")) {
            
            const v = client.emojis.cache.get("615983179341496321");
            const x = client.emojis.cache.get("615983201156071424");
            const ban = client.emojis.cache.get("808732827406958632");

            let ascounters = JSON.parse(fs.readFileSync("./antispamcounts.json", "utf-8"));
            if(!ascounters[message.author.id]) {
            ascounters[message.author.id] = {
                count: 0
            }
            }
            let ascounter = ascounters[message.author.id].count;

            if(cooldown.has(message.author.id)) {
            ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

            fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
                if(err) console.log(err);
            });

            message.delete();
            }
    //WARN
            if(ascounter === 5) {
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***AUTOMOD warned ${message.author}, because of spamming!***`)
            message.channel.send({ embeds: [ warnEmbed ]});

            db.push(`info.${message.guild.id}.${message.author.id}`, { date: moment().format("DD-MM-YYYY"), warnedby: "AUTOMOD", reason: "Spamming" });

            const warnPmEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚠️ | Warned`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`You were warned in \`${message.guild.name}\`, because of \`spamming\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Warning\`\n**» Reason:** \`AUTOMOD » Spamming\``)
            message.member.send({ embeds: [ warnPmEmbed ]})
            .catch(err => console.log(err));
        
            const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
            if(logChannel) {
                const warnLogEmbed = new Discord.MessageEmbed()
                .setColor(0x03a9f4)
                .setAuthor(`⚙️ | Logs`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**» MEMBER_WARN:**\nAUTOMOD **warned ${message.author}, because of spamming**!`)
                logChannel.send({ embeds: [ warnLogEmbed ]});
            }

            ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

            fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
                if(err) console.log(err);
            });
            }
    //KICK
            if(ascounter === 10) {
            const kickEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***AUTOMOD kicked ${message.author.tag}, because of spamming!***`)
            message.channel.send({ embeds: [ kickEmbed ]});

            const kickPmEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⛑️ | Kicked`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`You were \`kicked\` from \`${message.guild.name}\`, because of \`spamming\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Kick\`\n**» Reason:** \`AUTOMOD » Spamming\``)
            message.member.send({ embeds: [ kickPmEmbed ]})
            .catch(err => console.log(err));
            
            message.member.kick("AUTOMOD » Spamming");
        
            const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
            if(logChannel) {
                const kickLogEmbed = new Discord.MessageEmbed()
                .setColor(0x03a9f4)
                .setAuthor(`⚙️ | Logs`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**» MEMBER_KICK:**\nAUTOMOD **kicked ${message.author.tag}, because of spamming**!`)
                .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
                logChannel.send({ embeds: [ kickLogEmbed ]});
            }

            ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

            fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
                if(err) console.log(err);
            });
            }
    //BAN
            if(ascounter === 15 || 
            ascounter === 20 || 
            ascounter === 25 || 
            ascounter === 30 || 
            ascounter === 35 || 
            ascounter === 40 || 
            ascounter === 45 || 
            ascounter === 50
            ) {
            const banEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***AUTOMOD banned ${message.author.tag}, because of spamming!***`)
            message.channel.send({ embeds: [ banEmbed ]});

            const banPmEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setTitle(`${ban} | Banned`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`You were \`banned\` from \`${message.guild.name}\`, because of \`spamming\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Ban\`\n**» Reason:** \`AUTOMOD » Spamming\``)
            message.member.send({ embeds: [ banPmEmbed ]})
            .catch(err => console.log(err));
        
            const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
            if(logChannel) {
                const banLogEmbed = new Discord.MessageEmbed()
                .setColor(0x03a9f4)
                .setAuthor(`⚙️ | Logs`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**» MEMBER_BAN_ADD:**\nAUTOMOD **banned ${message.author.tag}, because of spamming**!`)
                .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
                logChannel.send({ embeds: [ banLogEmbed ]});
            }

            message.guild.members.ban(`${message.author.id}`, { days: 7, reason: "AUTOMOD » Spamming" });

            ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

            fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
                if(err) console.log(err);
            });
            }

            cooldown.add(message.author.id);

            setTimeout(() => {
            cooldown.delete(message.author.id);
            }, cdtime);

        }
        }
    }

    //AUTOMOD ANTIINVITES
        if(message.content.toLowerCase().includes("discord.gg") || message.content.includes("discord.com/invite/") || message.content.includes("discord.link") || message.content.includes("invite.gg") || message.content.includes("discord.io")
        ) {
    
        let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
        if(!automods[message.guild.id]) {
            automods[message.guild.id] = {
            antiswear: "disable",
            antispam: "disable",
            antiinvites: "disable",
            antiraid: "disable"
            }
        }
        let antiinvites = automods[message.guild.id].antiinvites;
        
        let v = client.emojis.cache.get("615983179341496321");
    
        if(antiinvites === "enable") {
            if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    
            message.delete();
    
            const automodEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***AUTOMOD warned ${message.author}, because of sending invites!***`)
            message.channel.send({ embeds: [ automodEmbed ]});
    
            const automodPmEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⛑️ | Automod`)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`AUTOMOD warned you in \`${message.guild.name}\`, because of \`sending invites\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Warn\`\n**» Reason:** \`Sending Invites\`\n**» Message:** ||\`${message.content}\`||`)
            message.member.send({ embeds: [ automodPmEmbed ]})
            .catch(err => console.log(err));
    
            const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
            if(logChannel) {
              const automodLogEmbed = new Discord.MessageEmbed()
              .setColor(0x03a9f4)
              .setAuthor(`⚙️ | Logs`)
              .setThumbnail(message.author.displayAvatarURL())
              .setDescription(`**» AUTOMOD:**\n**AUTOMOD warned ${message.author}**, because of **sending invites**!\n**» Message:** ||\`${message.content}\`||`)
              logChannel.send({ embeds: [ automodLogEmbed ]});
            }
          }
        }
      }

    //COUNTING & COOLDOWN
    let countings = JSON.parse(fs.readFileSync("./countings.json", "utf-8"));
    if(countings[message.channel.id] && countings[message.channel.id].status === "start") {
        let count = countings[message.channel.id].count;

        if(Number.isInteger(parseInt(message.content))) {
        if(parseInt(message.content) === (count + 1)) {

            let cooldowns = JSON.parse(fs.readFileSync("./cooldowns.json", "utf-8"));
            if(!cooldowns[message.channel.id]) {
            cooldowns[message.channel.id] = {
                cooldown: 0
            }
            }
            let cooldown = cooldowns[message.channel.id].cooldown;

            if(cooldown === message.author.id) {
            message.delete();

            const x = client.emojis.cache.get("615983201156071424");
        
            const cooldownEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setDescription(`${x} **|** ***${message.author}, you're on counting cooldown until another member has counted \`1\` number further!***`)
            return message.channel.send({ embeds: [ cooldownEmbed ]})
            .then(m => setTimeout(() => m.delete(), 5000));
            }

            const v = client.emojis.cache.get("615983179341496321");
            message.react(v);

            let countings = JSON.parse(fs.readFileSync("./countings.json", "utf-8"));

            countings[message.channel.id] = {
            status: "start",
            count: count + 1
            }

            fs.writeFile("./countings.json", JSON.stringify(countings), (err) => {
            if(err) console.log(err);
            });

            //let cooldowns = JSON.parse(fs.readFileSync("./cooldowns.json", "utf-8"));

            cooldowns[message.channel.id] = {
            cooldown: message.author.id
            }

            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
            if(err) console.log(err);
            });

        } else {

            message.delete();

            const x = client.emojis.cache.get("615983201156071424");

            const errorEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setDescription(`${x} **|** ***The number \`${message.content}\` doesn't come after number \`${count}\`!***`)
            message.channel.send({ embeds: [ errorEmbed ]})
            .then(m => setTimeout(() => m.delete(), 5000));
        }
        } else {

        if(!message.content.toLowerCase() === `${prefix}counting` || 
            !message.content.toLowerCase() === `${prefix}counting start` || 
            !message.content.toLowerCase() === `${prefix}counting stop`
            ) {

            message.delete();

            const x = client.emojis.cache.get("615983201156071424");

            const errorEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setDescription(`${x} **|** ***You aren't allowed to chat in this channel!***`)
            message.channel.send({ embeds: [ errorEmbed ]})
            .then(m => setTimeout(() => m.delete(), 5000));
        }
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////

    //let prefix = config.prefix;
    if(message.mentions.has(client.user) && message.content.includes("help")) {

        const mentionEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Mention`)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(`Hey, ${message.author}!\n**» Current Prefix:** \`${prefix}\`\n**» Help Command:** \`${prefix}help\`\n**» Website: [rexbot.ga](https://rexbot.ga)**`)
        message.channel.send({ embeds: [ mentionEmbed ]})
        .then(message.react("🤖"));

    }
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if(commandfile) commandfile.run(client, message, args);

/////////////////////////////////////////////////////////////////////////////////////////////
//COMMANDS LOG
    const commandslogChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-commands-log`);
    if(!commandslogChannel) return console.log(`WARNINGERROR: There is no channel named #rex-commands-log in the server with id: 516227189251768330!`);
    if(message.content.startsWith(prefix)) commandslogChannel.send(`\`\`\`[${message.guild.name}] #${message.channel.name} > ${message.author.tag}: ${message.content}\`\`\``);
  }

  module.exports.help = {
    name: "messageCreate"
}