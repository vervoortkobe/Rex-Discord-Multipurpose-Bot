const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let {data} = await fetch;

    fetch(`http://ip-api.com/json/${args[0]}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,query`)
    .then(res => res.json()).then(data => {
      if(!data) return message.channel.send(`❌ | There went something wrong! Pls try again!`);

    if(!args[0]) {
        const geoipUsageEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`⚙️ | ${client.user.username} GeoIP`)
        .setDescription(`Usage: **${prefix}geoip <ip>**`)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        return message.channel.send(geoipUsageEmbed);
    }

    if(data.status === 'fail') return message.channel.send(`❌ | Couldn't locate the IP, because it's an IPv4, an IPv6 or an invalid IP address!`);

    const geoipEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`👤 | ${client.user.username} GeoIP`)
    .addField(`IP`, `\`${data.query}\``)
    .addField(`Continent`, `\`${data.continent}\`, \`${data.continentCode}\``)
    .addField(`Country`, `\`${data.country}\`, \`${data.countryCode}\``)
    .addField(`Region`, `\`${data.regionName}\``)
    .addField(`City`, `\`${data.city}\``)
    .addField(`Latitude - Longitude`, `\`${data.lat}\` - \`${data.lon}\``)
    .addField(`Timezone`, `\`${data.timezone}\``)
    .addField(`Currency`, `\`${data.currency}\``)
    .addField(`Provider`, `\`${data.isp}\``)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(geoipEmbed);
    }
  )}

  module.exports.help = {
    name: "geoip"
}