"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondForReplys = void 0;
const discord_js_1 = require("discord.js");
const replys_json_1 = __importDefault(require("../../replys.json"));
let row = new discord_js_1.MessageActionRow().setComponents(new discord_js_1.MessageButton()
    .setEmoji("⏯️")
    .setCustomId("play_pause")
    .setStyle("SECONDARY"), new discord_js_1.MessageButton().setEmoji("⏹️").setCustomId("stop").setStyle("SECONDARY"), new discord_js_1.MessageButton()
    .setEmoji("🔊")
    .setCustomId("volume_up")
    .setStyle("SECONDARY"), new discord_js_1.MessageButton()
    .setEmoji("🔉")
    .setCustomId("volume_down")
    .setStyle("SECONDARY"), new discord_js_1.MessageButton().setEmoji("🔂").setCustomId("loop").setStyle("SECONDARY"));
function respondForReplys(message, interaction, respond, client, base, is) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${(base === null || base === void 0 ? void 0 : base.guildId) || ""}`) || "en";
        let replys = replys_json_1.default[lang];
        if (is == true) {
            let player = (_a = client.manager) === null || _a === void 0 ? void 0 : _a.players.get((base === null || base === void 0 ? void 0 : base.guildId) || "");
            let track = player === null || player === void 0 ? void 0 : player.queue[player.queue.length - 1];
            if (interaction == null)
                message === null || message === void 0 ? void 0 : message.edit({
                    content: replys.doneAddedMusic
                        .replace("{song[title]}", (track === null || track === void 0 ? void 0 : track.title) || "")
                        .replace("{song[url]}", (track === null || track === void 0 ? void 0 : track.uri) || ""),
                }).catch(() => { });
            else
                interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                    content: replys.doneAddedMusic
                        .replace("{song[title]}", (track === null || track === void 0 ? void 0 : track.title) || "")
                        .replace("{song[url]}", (track === null || track === void 0 ? void 0 : track.uri) || ""),
                }).catch(() => { });
        }
        else {
            if (["LOAD_FAILED", "NO_MATCHES"].includes(String(respond === null || respond === void 0 ? void 0 : respond.loadType))) {
                if (interaction == null)
                    message === null || message === void 0 ? void 0 : message.edit({
                        content: replys.FAILEDToLoad,
                    }).catch(() => { });
                else
                    interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                        content: replys.FAILEDToLoad,
                    }).catch(() => { });
            }
            else if ((respond === null || respond === void 0 ? void 0 : respond.loadType) == "SEARCH_RESULT") {
                let track = (_c = (_b = client.manager) === null || _b === void 0 ? void 0 : _b.players.get((base === null || base === void 0 ? void 0 : base.guildId) || "")) === null || _c === void 0 ? void 0 : _c.queue.current;
                if (interaction == null)
                    message === null || message === void 0 ? void 0 : message.edit({
                        content: replys.donePlayingMusic
                            .replace("{song[title]}", (track === null || track === void 0 ? void 0 : track.title) || "")
                            .replace("{song[url]}", (track === null || track === void 0 ? void 0 : track.uri) || ""),
                        components: [row],
                    }).catch(() => { });
                else
                    interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                        content: replys.donePlayingMusic
                            .replace("{song[title]}", (track === null || track === void 0 ? void 0 : track.title) || "")
                            .replace("{song[url]}", (track === null || track === void 0 ? void 0 : track.uri) || ""),
                        components: [row],
                    }).catch(() => { });
            }
            else if ((respond === null || respond === void 0 ? void 0 : respond.loadType) == "PLAYLIST_LOADED") {
                if (interaction == null)
                    message === null || message === void 0 ? void 0 : message.edit({
                        content: replys.donePlayingList.replace("{songs[length]}", respond.tracks.length + ""),
                        components: [row],
                    }).catch(() => { });
                else
                    interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                        content: replys.donePlayingList.replace("{songs[length]}", respond.tracks.length + ""),
                        components: [row],
                    }).catch(() => { });
            }
        }
    });
}
exports.respondForReplys = respondForReplys;
