"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
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
const { MessageEmbed } = require("discord.js");
const queuePages_1 = require("../../functions/queuePages");
const commandName = "search";
class StopCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "music", [], {
            name: commandName,
            description: "replay the current track.",
            type: "CHAT_INPUT",
            options: [
                {
                    name: "arg",
                    description: "the song name/url",
                    required: true,
                    type: "STRING",
                },
            ],
        });
    }
    /**
     * 
     * @param {import("../../client/client").default} client 
     * @param {*} interaction 
     * @param {*} message 
     * @param {*} args 
     * @param {*} author 
     * @returns 
     */
    run(client, interaction, message, args, author) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            if ((yield (0, checkVoice_1.default)(base, author)) !== "notInVoiceChannel") {
                let player = (_d = client.manager) === null || _d === void 0 ? void 0 : _d.players.get(((_e = base.guild) === null || _e === void 0 ? void 0 : _e.id) || "");
                let option;
                if (message == null)
                    option = interaction.options.getString("arg", true);
                else if (interaction == null)
                    option = args[0] ? args.join(" ") : null;
                    console.log(option)
                if (!option) {
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
                yield client.manager.search(option, author).then(res => {
                    if (!res.tracks) return;
                    let arrayOfEmbeds = [];
                    res.tracks.forEach(track => {
                        arrayOfEmbeds.push(new MessageEmbed().setAuthor({
                            name: track.title,
                            url: track.uri,
                        }).setThumbnail(track.thumbnail)
                        .setColor(0x4458f7))
                    })
                    setTimeout(() => {
                        (0, queuePages_1.queuePages)(client, base, arrayOfEmbeds, "SECONDARY", true, true);
                    }, 1800)
                })
            }
            else {
                if ((yield (0, checkVoice_1.default)(base, author)) == "notInVoiceChannel") {
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
