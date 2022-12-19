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
const checkPlayer_1 = __importDefault(require("../../functions/checkPlayer"));
const quick_db_1 = __importDefault(require("quick.db"));
const commandName = "24_7";
class StopCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "admin", ["24/7"], {
            name: commandName,
            description: "join a voice channel 24/7.",
            type: "CHAT_INPUT",
            options: [],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            if (!((_b = (_a = base.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(author.id)) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                if (message == null)
                    interaction
                        .editReply({
                        content: replys.noPerms,
                    })
                        .catch(() => { });
                else
                    message
                        .edit({
                        content: replys.noPerms,
                    })
                        .catch(() => { });
                return;
            }
            if ((yield (0, checkVoice_1.default)(base, author)) !== "notInVoiceChannel") {
                let checker = quick_db_1.default.fetch(`24/7_${(_c = base.guild) === null || _c === void 0 ? void 0 : _c.id}`);
                if (checker !== null &&
                    checker.voice ==
                        ((_e = (_d = base.guild) === null || _d === void 0 ? void 0 : _d.members.cache.get(author.id)) === null || _e === void 0 ? void 0 : _e.voice.channelId)) {
                    if ((_f = client.manager) === null || _f === void 0 ? void 0 : _f.players.get(((_g = base.guild) === null || _g === void 0 ? void 0 : _g.id) || ""))
                        (_k = (_h = client.manager) === null || _h === void 0 ? void 0 : _h.players.get(((_j = base.guild) === null || _j === void 0 ? void 0 : _j.id) || "")) === null || _k === void 0 ? void 0 : _k.destroy();
                    quick_db_1.default.set(`24/7_${(_l = base.guild) === null || _l === void 0 ? void 0 : _l.id}`, null);
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.doneDisConnect.replace("{voice[channel[mention]]}", "<#" +
                                ((_o = (_m = base.guild) === null || _m === void 0 ? void 0 : _m.members.cache.get(author.id)) === null || _o === void 0 ? void 0 : _o.voice.channelId) +
                                "> as 24/7"),
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.doneDisConnect.replace("{voice[channel[mention]]}", "<#" +
                                ((_q = (_p = base.guild) === null || _p === void 0 ? void 0 : _p.members.cache.get(author.id)) === null || _q === void 0 ? void 0 : _q.voice.channelId) +
                                "> as 24/7"),
                        })
                            .catch(() => { });
                }
                else {
                    yield (0, checkPlayer_1.default)({
                        author,
                        base,
                        client,
                        resultRespond: undefined,
                    }).then((d) => d === null || d === void 0 ? void 0 : d.connect());
                    quick_db_1.default.set(`24/7_${(_r = base.guild) === null || _r === void 0 ? void 0 : _r.id}`, {
                        voice: ((_t = (_s = base.guild) === null || _s === void 0 ? void 0 : _s.members.cache.get(author.id)) === null || _t === void 0 ? void 0 : _t.voice.channelId) ||
                            String(null),
                        text: base.channelId,
                    });
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.doneConnect.replace("{voice[channel[mention]]}", "<#" +
                                ((_v = (_u = base.guild) === null || _u === void 0 ? void 0 : _u.members.cache.get(author.id)) === null || _v === void 0 ? void 0 : _v.voice.channelId) +
                                "> as 24/7"),
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.doneConnect.replace("{voice[channel[mention]]}", "<#" +
                                ((_x = (_w = base.guild) === null || _w === void 0 ? void 0 : _w.members.cache.get(author.id)) === null || _x === void 0 ? void 0 : _x.voice.channelId) +
                                "> as 24/7"),
                        })
                            .catch(() => { });
                }
            }
            else {
                if (!((_y = client.manager) === null || _y === void 0 ? void 0 : _y.players.get(((_z = base.guild) === null || _z === void 0 ? void 0 : _z.id) || ""))) {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.alreadyConnected,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.alreadyConnected,
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
            }
        });
    }
}
exports.default = StopCommand;
