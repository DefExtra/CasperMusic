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
const emojis = require("../../../config.json").emojis;
const discord_js_1 = require("discord.js");
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const replys_json_1 = __importDefault(require("../../../replys.json"));
const quick_db_1 = __importDefault(require("quick.db"));
const commandName = "setup";
class SetupCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "admin", ["make"], {
            name: commandName,
            description: "setup the quick play room",
            type: "CHAT_INPUT",
            options: [],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let base = message ? message : interaction;
                let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
                let replys = replys_json_1.default[lang];
                if (interaction == null) {
                    message === null || message === void 0 ? void 0 : message.edit({
                        content: replys.setupWithSlashOnly,
                    }).catch(() => { });
                }
                else {
                    if (!((_b = (_a = base.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(author.id)) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR))) {
                        interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                            content: replys.noPerms,
                        }).catch(() => { });
                        return;
                    }
                    let channel = base.channel;
                    if (!channel || !(channel === null || channel === void 0 ? void 0 : channel.send)) {
                        interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                            content: replys.noChannelFound,
                        }).catch(() => { });
                        return;
                    }
                    let menu = new discord_js_1.MessageSelectMenu()
                        .setOptions([
                            {
                                label: "Nightcore",
                                value: "nightcore",
                                description: "Add nighcore filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Vaporwave",
                                value: "vaporwave",
                                description: "Add vaporwave filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "BassBoost",
                                value: "bassboost",
                                description: "Add Bass Boost filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Soft",
                                value: "soft",
                                description: "Add soft filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Pop",
                                value: "pop",
                                description: "Add pop filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "treblebass",
                                value: "treblebass",
                                description: "Add treble bass filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Eight Dimension",
                                value: "eightD",
                                description: "Add 8D filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Karaoke",
                                value: "karaoke",
                                description: "Add karaoke filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Vibrato",
                                value: "vibrato",
                                description: "Add vibrato filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Tremolo",
                                value: "tremolo",
                                description: "Add tremolo filter to the player",
                                emoji: emojis.casperEmoji
                            },
                            {
                                label: "Reset",
                                value: "reset",
                                description: "Reset the filter",
                                emoji: emojis.x
                            },

                        ])
                        .setPlaceholder("Select a filter")
                        .setMinValues(1)
                        .setMaxValues(1)
                        .setCustomId("filters");
                    let newRow = new discord_js_1.MessageActionRow().setComponents(menu)
                    let row = new discord_js_1.MessageActionRow().setComponents(new discord_js_1.MessageButton()
                        .setEmoji("👀")
                        .setCustomId("soon")
                        .setDisabled(true)
                        .setStyle("PRIMARY"), new discord_js_1.MessageButton()
                            .setEmoji("⏮️")
                            .setCustomId("casper_back")
                            .setStyle("SUCCESS"), new discord_js_1.MessageButton()
                                .setEmoji("⏯️")
                                .setCustomId("casper_play_pause")
                                .setStyle("DANGER"), new discord_js_1.MessageButton()
                                    .setEmoji("⏭️")
                                    .setCustomId("casper_skip")
                                    .setStyle("SUCCESS"), new discord_js_1.MessageButton()
                                        .setEmoji("🔂")
                                        .setCustomId("casper_loop")
                                        .setStyle("PRIMARY"));
                    let row2 = new discord_js_1.MessageActionRow().setComponents(new discord_js_1.MessageButton()
                        .setEmoji("🔉")
                        .setCustomId("casper_volume_down")
                        .setStyle("PRIMARY"), new discord_js_1.MessageButton()
                            .setEmoji("⏪")
                            .setCustomId("casper_seek_back")
                            .setStyle("SUCCESS"), new discord_js_1.MessageButton()
                                .setEmoji("⏹️")
                                .setCustomId("casper_stop")
                                .setStyle("DANGER"), new discord_js_1.MessageButton()
                                    .setEmoji("⏩")
                                    .setCustomId("casper_seek_go")
                                    .setStyle("SUCCESS"), new discord_js_1.MessageButton()
                                        .setEmoji("🔊")
                                        .setCustomId("casper_volume_up")
                                        .setStyle("PRIMARY"));
                    let embed = new discord_js_1.MessageEmbed()
                        .setColor("#4458F7")
                        .setTitle(`**No song playing currently**`)
                        .setDescription("Casper is a scary toune for your server.")
                        .setFooter({
                            text: "all the bot commands woking with slashcommands or the normal prefix",
                        })
                        .setImage(require("../../../config.json").images.quickPlay);
                    channel
                        ? channel === null || channel === void 0 ? void 0 : channel.send({
                            content: "**__Queue list__**:\nJoin a voice channel and queue songs by name or url in here.",
                            embeds: [embed],
                            components: [newRow, row, row2],
                        }).catch(() => { }).then((message) => {
                            quick_db_1.default.set(`Channel_${base.guildId}`, {
                                channel: channel,
                                messsageId: message === null || message === void 0 ? void 0 : message.id,
                            });
                            interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                                content: replys.doneSetupTheChannel.replace("{channel[name]}", channel === null || channel === void 0 ? void 0 : channel.name),
                            }).catch(() => { });
                        })
                        : "";
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = SetupCommand;
