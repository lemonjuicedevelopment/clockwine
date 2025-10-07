const { AoiClient, LoadCommands } = require("aoi.js");
const { AoiVoice, PlayerEvents, PluginName, Cacher, Filter } = require("@akarui/aoi.music");
const { Panel } = require("@akarui/aoi.panel");
const { InviteManager } = require("@akarui/aoi.invite");
require('dotenv').config()

const clockwine = new AoiClient({
  token: process.env.TOKEN,
  prefix: "cw!",
  intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    dbType: "KeyValue",
    tables: ["blacklisting"],
    securityKey: process.env.SECURITYKEY,
  }
});

const voice = new AoiVoice(clockwine, {
    searchOptions: {
        youtubegl: "US",
    },
    requestOptions: {
        offsetTimeout: 0,
        soundcloudLikeTrackLimit: 200,
    },
});

voice.addPlugin(PluginName.Cacher, new Cacher("memory"));

voice.addPlugin(
    PluginName.Filter,
    new Filter({
        filterFromStart: false,
    }),
);

voice.bindExecutor(clockwine.functionManager.interpreter);

const panel = new Panel({
  port: 3000,
  client: clockwine,
});

panel.loadAPI({
  auth: process.env.PANELAUTH,
});

const credentials = require('./handlers/credentials.js');
panel.loadGUI(credentials);

new InviteManager(clockwine, {
    sk: process.env.INVITEMANAGERSK,
}, ["inviteJoin", "inviteLeave"]);

require("./handlers/variables.js")(clockwine);
require("./handlers/status.js")(clockwine);
require("./handlers/callbacks.js")(clockwine);

clockwine.loadCommands("./commands");