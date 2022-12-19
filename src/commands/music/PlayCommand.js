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
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const checkVoice_1 = __importDefault(require("../../functions/checkVoice"));
const checkPlayer_1 = __importDefault(require("../../functions/checkPlayer"));
const playMusic_1 = __importDefault(require("../../functions/playMusic"));
const replys_json_1 = __importDefault(require("../../../replys.json"));
const respondForReplys_1 = require("../../functions/respondForReplys");
const commandName = "play";
class PlayCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "music", ["p"], {
            name: commandName,
            description: "play a song",
            type: "CHAT_INPUT",
            options: [
                {
                    name: "song",
                    description: "the song name/url",
                    required: true,
                    type: "STRING",
                },
            ],
        });
    }
    run(client, interaction, message, args, author) {
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            let option;
            if (message == null)
                option = interaction.options.getString("song", true);
            else if (interaction == null)
                option = args[0] ? args.join(" ") : null;
            (0, checkVoice_1.default)(base, author).then((res) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (res == "notInTheSameVoiceChannel") {
                    if (interaction == null)
                        message
                            .edit({
                            content: replys.notInTheSameVoiceChannel,
                        })
                            .catch(() => { });
                    else if (message == null)
                        interaction
                            .editReply({
                            content: replys.notInTheSameVoiceChannel,
                        })
                            .catch(() => { });
                    return;
                }
                else if (res == "notInVoiceChannel") {
                    if (interaction == null)
                        message
                            .edit({
                            content: replys.notInVoiceChannel,
                        })
                            .catch(() => { });
                    else if (message == null)
                        interaction
                            .editReply({
                            content: replys.notInVoiceChannel,
                        })
                            .catch(() => { });
                    return;
                }
                else if (res == undefined) {
                    let is;
                    if (option == null) {
                        if (interaction == null)
                            message
                                .edit({
                                content: replys.noArgSong,
                            })
                                .catch(() => { });
                        else if (message == null)
                            interaction
                                .editReply({
                                content: replys.noArgSong,
                            })
                                .catch(() => { });
                        return;
                    }
                    // if (option.includes("https://")) {
                    //   if (
                    //     !option.includes("https://open.spotify.com") ||
                    //     !option.startsWith("https://soundcloud.com") ||
                    //     !option.startsWith("https://www.youtube.com") ||
                    //     !option.startsWith("https://youtu.be")
                    //   ) {
                    //     if (interaction == null)
                    //       message
                    //         .edit({
                    //           content: replys.notAllowedUrl,
                    //         })
                    //         .catch(() => {});
                    //     else if (message == null)
                    //       interaction
                    //         .editReply({
                    //           content: replys.notAllowedUrl,
                    //         })
                    //         .catch(() => {});
                    //     return;
                    //   }
                    // }
                    const respond = yield ((_a = client.manager) === null || _a === void 0 ? void 0 : _a.search(option, author));
                    (0, checkPlayer_1.default)({
                        resultRespond: respond,
                        base: base,
                        client: client,
                        author: author,
                    }).then((player) => __awaiter(this, void 0, void 0, function* () {
                        yield (function () {
                            var _a;
                            if ((_a = player === null || player === void 0 ? void 0 : player.queue.current) === null || _a === void 0 ? void 0 : _a.uri)
                                is = true;
                            else
                                is = false;
                        })();
                        (0, playMusic_1.default)({
                            player: player,
                            resultRespond: respond,
                            client,
                        }).then((d) => {
                            (0, respondForReplys_1.respondForReplys)(message, interaction, respond, client, base, is);
                        });
                    }));
                }
            }));
        });
    }
}
exports.default = PlayCommand;
