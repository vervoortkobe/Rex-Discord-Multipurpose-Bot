const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const loading = client.emojis.cache.get("615988699796340768");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    let {data} = await fetch;

    const mEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setDescription(`${loading} **|** ***Contacting geolocalisation API and waiting for response...***`)
    const m = await message.channel.send(mEmbed);

    fetch(`https://ip-api.com/json/${args[0]}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`)
    .then(res => res.json()).then(data => {
      if(!data.status) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
        return message.channel.send(errorEmbed);
      }

      if(!args[0]) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | GeoIP`)
        .setDescription(`${x} **|** ***Usage: ${prefix}geoip <IP-address>***`)
        return message.channel.send(usageEmbed);
      }

      if(data.status === "fail") {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't locate the IP-address, because it isn't an IPv4 or an IPv6 or because it's an invalid IP address!***`)
        return message.channel.send(errorEmbed);
      }

      m.delete();

      let mapimg = new Discord.MessageAttachment(`https://open.mapquestapi.com/staticmap/v4/getplacemap?key=${process.env.MAPAPIKEY}&location=${data.city},${data.region}&size=1000,1000&zoom=9&showicon=red_1-1`, "map.png");

      let mobile;
      if(data.mobile === true) mobile = `${v} \`Yes\``;
      if(data.mobile === false) mobile = `${x} \`No\``;
      let proxy;
      if(data.proxy === true) proxy = `${v} \`Yes\``;
      if(data.proxy === false) proxy = `${x} \`No\``;
      let hosting;
      if(data.hosting === true) hosting = `${v} \`Yes\``;
      if(data.hosting === false) hosting = `${x} \`No\``;

      const geoipEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🌐 | GeoIP`)
      .setDescription(`**» IP Address:** \`${data.query}\`\n**» Continent:** \`${data.continent}\`, \`${data.continentCode}\`\n**» Country:** \`${data.country}\`, \`${data.countryCode}\`\n**» Region:** \`${data.regionName}\`, \`${data.region}\`\n**» Nearest Capital City:** \`${data.city}\`\n**» Postal ZIP Code:** \`${data.zip}\`\n**» Latitude - Longitude:** \`${data.lat}\` - \`${data.lon}\`\n**» Timezone:** \`${data.timezone.replace("_", " ")}\`\n**» Currency:** \`${data.currency}\`\n**» ISP:** \`${data.org}\`\n**» Mobile | Proxy | Hosting:** ${mobile} | ${proxy} | ${hosting}`)
      .attachFiles(mapimg)
      .setImage("attachment://map.png")
      message.channel.send(geoipEmbed)
      .then(message.react("🌐"));
    });
  }

  module.exports.help = {
    name: "geoip",
    aliases: ["iplookup"],
    category: "other"
}