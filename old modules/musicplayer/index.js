
//const ffmpeg = require("ffmpeg-static");
//const opus = require("opusscript");
const YouTubeNotifier = require("youtube-notification");
//const ytdl = require("ytdl-core");
//const { YouTube } = require("popyt");
//const ytpl = require("ytpl");
////////////////////////////////////////////////////////////////////////////////////////////////////
//MUSICPLAYER
  const MusicClient = require("./musicplayer/index.js");
  const musicplayer = new MusicClient({
    botPrefix: prefix,
    ytApiKey: process.env.YTAPIKEY,
    botClient: client
  });

  if(message.content.startsWith(musicplayer.prefix)) {
    musicplayer.onMessage(message);
  }
