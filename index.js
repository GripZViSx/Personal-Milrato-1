const Discord = require("discord.js");
const colors = require("colors");
const enmap = require("enmap"); 
const fs = require("fs"); 
const emojis = require("./botconfig/emojis.json");
const config = require("./botconfig/config.json");
const advertisement = require("./botconfig/advertisement.json");
const { delay } = require("./handlers/functions");
const Meme = require("memer-api");
require('dotenv').config();

const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [ Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
  presence: {
    activities: [{name: `${config.status.text}`.replace("{prefix}", config.prefix), type: config.status.type, url: config.status.url}],
    status: "online"
  }
});

client.memer = new Meme(process.env.memer_api || config.memer_api);

client.la = { }
var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)

client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;

client.ad = {
  enabled: advertisement.adenabled,
  statusad: advertisement.statusad,
  spacedot: advertisement.spacedot,
  textad: advertisement.textad
}

function requirehandlers(){
  ["extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler", "slashCommands"].forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
  ["twitterfeed", "livelog", "youtube", "tiktok"].forEach(handler=>{
    try{ require(`./social_log/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
  [ "logger", "anti_nuke", "antidiscord", "antilinks","anticaps", "antispam", "blacklist", "keyword", "antimention", "autobackup",
    
    "apply", "ticket", "ticketevent",
    "roster", "joinvc", "epicgamesverification", "boostlog",
    
    "welcome", "leave", "ghost_ping_detector", "antiselfbot",

    "jointocreate", "reactionrole", "ranking", "timedmessages",
    
    "membercount", "autoembed", "suggest", "validcode", "dailyfact", "autonsfw",
    "aichat", "mute", "automeme", "counter"].forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
}requirehandlers();

require('./server')();

client.login(process.env.TOKEN);
