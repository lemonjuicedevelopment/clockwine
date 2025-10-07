const { AoiClient, LoadCommands } = require("aoi.js");
const { Manager } = require('aoijs.lavalink');
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

const voice = new Manager(clockwine, {
    nodes: [
        {
            name: 'lavalinko',
            host: 'lava-v4.ajieblogs.eu.org',
            port: 80,
            auth: 'https://dsc.gg/ajidevserver',
            secure: false
        }
    ]
});

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