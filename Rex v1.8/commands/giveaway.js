const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    var prize = "";
    var time;
    var winnerCount;
 
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`❌ | Couldn't create the giveaway, because you do not have the correct permission (MANAGE_ROLES) to do this!`);

    winnerCount = args[0];
    time = args[1];
    prize = args.splice(2, args.length).join(' ');
 
    if(!winnerCount) {
      const giveawayUsageEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Comment`)
      .setDescription(`Usage: **${prefix}giveaway <winners amount> <time (in sec)> <prize>**`)
      .setFooter(`© Rex was made by Tsunami#6271`)
      message.channel.send(giveawayUsageEmbed);
    }
    message.delete();
 
    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));

    var giveawayEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🎉 | ${client.user.username} Giveaway`)
    .addField(`Giveaway Prize`, prize)
    .addField(`Expire Date`, dateTime)
    .addField(`Winners Amount`, winnerCount)
    .setFooter(`© Rex was made by Tsunami#6271`)

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");
 
    setTimeout(function () {
 
        var random = 0;
        var winners = [];
        var inList = false;
        var peopleReacted = embedSend.reactions.get("🎉").users.array();
 
        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == client.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        if (peopleReacted.length == 0) {
            return message.channel.send(`❌ | Nobody won!`);
        }

        if (peopleReacted.length < winnerCount) {
            return message.channel.send(`❌ | The amount of participants was to small!`);
        }
 
        for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
            random = Math.floor(Math.random() * peopleReacted.length);
 
            for (var y = 0; y < winners.length; y++) {
                if (winners[y] == peopleReacted[random]) {
                    i--;
                    inList = true;
                    break;
                }
            }
 
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
 
        for (var i = 0; i < winners.length; i++) {
            message.channel.send(`🎉 | Congratulations ${winners[i]}! You just won **${prize}**!`);
        }
 
    }, 1000 * time);
  }

module.exports.help = {
  name: "giveaway"
}