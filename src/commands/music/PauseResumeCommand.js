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
const commandName = "pause_and_resume";
class StopCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "music", ["resume", "pause"], {
            name: commandName,
            description: "pause or resume the playing track",
            type: "CHAT_INPUT",
            options: [],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            if (((_c = (_a = client.manager) === null || _a === void 0 ? void 0 : _a.players.get(((_b = base.guild) === null || _b === void 0 ? void 0 : _b.id) || "")) === null || _c === void 0 ? void 0 : _c.queue.current) &&
                (yield (0, checkVoice_1.default)(base, author)) !== "notInTheSameVoiceChannel" &&
                (yield (0, checkVoice_1.default)(base, author)) !== "notInVoiceChannel") {
                let player = (_d = client.manager) === null || _d === void 0 ? void 0 : _d.players.get(base.guildId || "");
                if (player === null || player === void 0 ? void 0 : player.paused) {
                    player === null || player === void 0 ? void 0 : player.pause(false);
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.doneResume,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.doneResume,
                        })
                            .catch(() => { });
                }
                else {
                    player === null || player === void 0 ? void 0 : player.pause(true);
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.donePause,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.donePause,
                        })
                            .catch(() => { });
                }
            }
            else {
                if (!((_g = (_e = client.manager) === null || _e === void 0 ? void 0 : _e.players.get(((_f = base.guild) === null || _f === void 0 ? void 0 : _f.id) || "")) === null || _g === void 0 ? void 0 : _g.queue.current)) {
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
