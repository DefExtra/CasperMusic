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
const discord_js_1 = require("discord.js");
const checkVoice_1 = __importDefault(require("../../functions/checkVoice"));
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const replys_json_1 = __importDefault(require("../../../replys.json"));
const ms_1 = __importDefault(require("ms"));
const queuePages_1 = require("../../functions/queuePages");
const commandName = "queue";
class StopCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "music", [], {
            name: commandName,
            description: "Displays info about the playing queue tracks",
            type: "CHAT_INPUT",
            options: [],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            if (((_c = (_a = client.manager) === null || _a === void 0 ? void 0 : _a.players.get(((_b = base.guild) === null || _b === void 0 ? void 0 : _b.id) || "")) === null || _c === void 0 ? void 0 : _c.queue.current) &&
                (yield (0, checkVoice_1.default)(base, author)) !== "notInTheSameVoiceChannel" &&
                (yield (0, checkVoice_1.default)(base, author)) !== "notInVoiceChannel") {
                let player = (_d = client.manager) === null || _d === void 0 ? void 0 : _d.players.get(((_e = base.guild) === null || _e === void 0 ? void 0 : _e.id) || "");
                let embedOne = new discord_js_1.MessageEmbed({
                    color: 0x4458f7,
                    author: {
                        name: ((_f = base.guild) === null || _f === void 0 ? void 0 : _f.name) + " ~ Queue",
                        icon_url: ((_g = client.user) === null || _g === void 0 ? void 0 : _g.avatarURL({ dynamic: true })) || "",
                    },
                    description: player === null || player === void 0 ? void 0 : player.queue.map((v, i) => `${i}. [${v.title}](${v.uri}) - \`${(0, ms_1.default)(v.duration || 0)}\``).slice(0, 5).join("\n"),
                });
                let embedTwo = new discord_js_1.MessageEmbed({
                    color: 0x4458f7,
                    author: {
                        name: ((_h = base.guild) === null || _h === void 0 ? void 0 : _h.name) + " ~ Queue",
                        icon_url: ((_j = client.user) === null || _j === void 0 ? void 0 : _j.avatarURL({ dynamic: true })) || "",
                    },
                    description: player === null || player === void 0 ? void 0 : player.queue.map((v, i) => `${i}. [${v.title}](${v.uri}) - \`${(0, ms_1.default)(v.duration || 0)}\``).slice(5, 10).join("\n"),
                });
                let embedThree = new discord_js_1.MessageEmbed({
                    color: 0x4458f7,
                    author: {
                        name: ((_k = base.guild) === null || _k === void 0 ? void 0 : _k.name) + " ~ Queue",
                        icon_url: ((_l = client.user) === null || _l === void 0 ? void 0 : _l.avatarURL({ dynamic: true })) || "",
                    },
                    description: player === null || player === void 0 ? void 0 : player.queue.map((v, i) => `${i}. [${v.title}](${v.uri}) - \`${(0, ms_1.default)(v.duration || 0)}\``).slice(10, 15).join("\n"),
                });
                let embedFour = new discord_js_1.MessageEmbed({
                    color: 0x4458f7,
                    author: {
                        name: ((_m = base.guild) === null || _m === void 0 ? void 0 : _m.name) + " ~ Queue",
                        icon_url: ((_o = client.user) === null || _o === void 0 ? void 0 : _o.avatarURL({ dynamic: true })) || "",
                    },
                    description: player === null || player === void 0 ? void 0 : player.queue.map((v, i) => `${i}. [${v.title}](${v.uri}) - \`${(0, ms_1.default)(v.duration || 0)}\``).slice(15, 20).join("\n"),
                });
                let embedFive = new discord_js_1.MessageEmbed({
                    color: 0x4458f7,
                    author: {
                        name: ((_p = base.guild) === null || _p === void 0 ? void 0 : _p.name) + " ~ Queue",
                        icon_url: ((_q = client.user) === null || _q === void 0 ? void 0 : _q.avatarURL({ dynamic: true })) || "",
                    },
                    description: player === null || player === void 0 ? void 0 : player.queue.map((v, i) => `${i}. [${v.title}](${v.uri}) - \`${(0, ms_1.default)(v.duration || 0)}\``).slice(20, 25).join("\n"),
                });
                let arrayOfEmbeds = [];
                arrayOfEmbeds.push(embedOne);
                let totalSize = 0;
                totalSize = player === null || player === void 0 ? void 0 : player.queue.totalSize;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    if (totalSize > 5)
                        arrayOfEmbeds.push(embedTwo);
                    if (totalSize > 10)
                        arrayOfEmbeds.push(embedThree);
                    if (totalSize > 15)
                        arrayOfEmbeds.push(embedFour);
                    if (totalSize > 20)
                        arrayOfEmbeds.push(embedFive);
                    yield (0, queuePages_1.queuePages)(client, base, arrayOfEmbeds, "SECONDARY", true, true);
                }));
                if (message == null)
                    interaction
                        .editReply({
                        content: replys.doneGetQueue,
                    })
                        .catch(() => { });
                else
                    message
                        .edit({
                        content: replys.doneGetQueue,
                    })
                        .catch(() => { });
            }
            else {
                if (!((_t = (_r = client.manager) === null || _r === void 0 ? void 0 : _r.players.get(((_s = base.guild) === null || _s === void 0 ? void 0 : _s.id) || "")) === null || _t === void 0 ? void 0 : _t.queue.current)) {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.noPlayingMusic,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.noPlayingMusic,
                        })
                            .catch(() => { });
                    return;
                }
                else if ((yield (0, checkVoice_1.default)(base, author)) == "notInVoiceChannel") {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.notInVoiceChannel,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.notInVoiceChannel,
                        })
                            .catch(() => { });
                    return;
                }
                else if ((yield (0, checkVoice_1.default)(base, author)) == "notInTheSameVoiceChannel") {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.notInTheSameVoiceChannel,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.notInTheSameVoiceChannel,
                        })
                            .catch(() => { });
                    return;
                }
            }
        });
    }
}
exports.default = StopCommand;
