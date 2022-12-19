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
const checkVoice_1 = __importDefault(require("../../functions/checkVoice"));
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const replys_json_1 = __importDefault(require("../../../replys.json"));
const checkPlayer_1 = __importDefault(require("../../functions/checkPlayer"));
const commandName = "join";
class StopCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "music", [], {
            name: commandName,
            description: "join a voice channel.",
            type: "CHAT_INPUT",
            options: [],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            if (!((_c = (_a = client.manager) === null || _a === void 0 ? void 0 : _a.players.get(((_b = base.guild) === null || _b === void 0 ? void 0 : _b.id) || "")) === null || _c === void 0 ? void 0 : _c.queue.current) &&
                (yield (0, checkVoice_1.default)(base, author)) !== "notInVoiceChannel") {
                yield (0, checkPlayer_1.default)({
                    author,
                    base,
                    client,
                    resultRespond: undefined,
                }).then((d) => d === null || d === void 0 ? void 0 : d.connect());
                if (message == null)
                    interaction
                        .editReply({
                        content: replys.doneConnect.replace("{voice[channel[mention]]}", "<#" +
                            ((_e = (_d = base.guild) === null || _d === void 0 ? void 0 : _d.members.cache.get(author.id)) === null || _e === void 0 ? void 0 : _e.voice.channelId) +
                            ">"),
                    })
                        .catch(() => { });
                else
                    message
                        .edit({
                        content: replys.doneConnect.replace("{voice[channel[mention]]}", "<#" +
                            ((_g = (_f = base.guild) === null || _f === void 0 ? void 0 : _f.members.cache.get(author.id)) === null || _g === void 0 ? void 0 : _g.voice.channelId) +
                            ">"),
                    })
                        .catch(() => { });
            }
            else {
                if (!((_h = client.manager) === null || _h === void 0 ? void 0 : _h.players.get(((_j = base.guild) === null || _j === void 0 ? void 0 : _j.id) || ""))) {
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
