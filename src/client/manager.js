"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const erela_js_1 = require("erela.js");
const config_json_1 = __importDefault(require("../../config.json"));
const discord_js_1 = require("discord.js");
//import ora from "ora";
// plugins
const erela_js_spotify_1 = __importDefault(require("erela.js-spotify"));
const erela_js_filters_1 = __importDefault(require("erela.js-filters"));
class default_1 extends erela_js_1.Manager {
    constructor(client) {
        super({ nodes: [config_json_1.default.lavaLink],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild)
                    guild.shard.send(payload);
            },
            plugins: [new erela_js_spotify_1.default(config_json_1.default.spotify), new erela_js_filters_1.default()] });
        this._events = new discord_js_1.Collection();
    }
    getManager() {
        return this;
    }
    getEvents() {
        return this._events;
    }
}

exports.default = default_1;
