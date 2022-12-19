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
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const replys_json_1 = __importDefault(require("../../../replys.json"));
const commandName = "help";
function collector(m, author, admin, utils, music, inter, mE) {
    m.createMessageComponentCollector({
        filter: (i) => i.user.id == author.id,
        componentType: "SELECT_MENU",
        time: 1000 * 60 * 5,
    }).on("collect", (i) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        yield i.deferUpdate().catch(() => { });
        switch (i.values[0]) {
            case "admin":
                {
                    let embed = i.message.embeds[0];
                    (_a = i.channel) === null || _a === void 0 ? void 0 : _a.messages.fetch(i.message.id).then((m) => {
                        if (inter !== true) {
                            m.edit({
                                embeds: [
                                    {
                                        image: {
                                            url: require("../../../config.json").images.adminMenu,
                                        },
                                        color: 0x4458f7,
                                        author: embed.author,
                                        description: admin
                                            .map((cmd) => `\`${cmd.getName()}\``)
                                            .join(", "),
                                    },
                                ],
                            });
                        }
                        else if (inter == true) {
                            if (inter !== true)
                                mE.editReply({
                                    embeds: [
                                        {
                                            image: {
                                                url: require("../../../config.json").images.adminMenu,
                                            },
                                            color: 0x4458f7,
                                            author: embed.author,
                                            description: admin
                                                .map((cmd) => `\`${cmd.getName()}\``)
                                                .join(", "),
                                        },
                                    ],
                                });
                        }
                    });
                }
                break;
            case "utils":
                {
                    let embed = i.message.embeds[0];
                    (_b = i.channel) === null || _b === void 0 ? void 0 : _b.messages.fetch(i.message.id).then((m) => {
                        if (inter !== true) {
                            m.edit({
                                embeds: [
                                    {
                                        image: {
                                            url: require("../../../config.json").images.utilsMenu,
                                        },
                                        color: 0x4458f7,
                                        author: embed.author,
                                        description: utils
                                            .map((cmd) => `\`${cmd.getName()}\``)
                                            .join(", "),
                                    },
                                ],
                            });
                        }
                        else if (inter == true) {
                            mE.editReply({
                                embeds: [
                                    {
                                        image: {
                                            url: require("../../../config.json").images.utilsMenu,
                                        },
                                        color: 0x4458f7,
                                        author: embed.author,
                                        description: utils
                                            .map((cmd) => `\`${cmd.getName()}\``)
                                            .join(", "),
                                    },
                                ],
                            });
                        }
                    });
                }
                break;
            case "music":
                {
                    let embed = i.message.embeds[0];
                    (_c = i.channel) === null || _c === void 0 ? void 0 : _c.messages.fetch(i.message.id).then((m) => {
                        if (inter !== true) {
                            m.edit({
                                embeds: [
                                    {
                                        image: {
                                            url: require("../../../config.json").images.musicMenu,
                                        },
                                        color: 0x4458f7,
                                        author: embed.author,
                                        description: music
                                            .map((cmd) => `\`${cmd.getName()}\``)
                                            .join(", "),
                                    },
                                ],
                            });
                        }
                        else if (inter == true) {
                            mE.editReply({
                                embeds: [
                                    {
                                        image: {
                                            url: require("../../../config.json").images.musicMenu,
                                        },
                                        color: 0x4458f7,
                                        author: embed.author,
                                        description: music
                                            .map((cmd) => `\`${cmd.getName()}\``)
                                            .join(", "),
                                    },
                                ],
                            });
                        }
                    });
                }
                break;
            default:
                break;
        }
    }));
}
class HelpCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "base", ["h"], {
            name: commandName,
            description: "preview the help menu",
            type: "CHAT_INPUT",
            options: [
                {
                    name: "command",
                    description: "get help with a spacific command",
                    type: "STRING",
                    required: false,
                },
            ],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            let option;
            if (message == null)
                option = interaction.options.getString("command");
            else if (interaction == null)
                option = args[0] ? args[0] : null;
            if (option == null || !option) {
                let commands = client.commands.toJSON();
                let utils = [];
                let admin = [];
                let music = [];
                let embed = new discord_js_1.MessageEmbed()
                    .setImage(require("../../../config.json").images.helpMenu)
                    .setColor("#4458F7")
                    .setAuthor({
                    name: "~ CasperMusic.",
                    iconURL: ((_a = client.user) === null || _a === void 0 ? void 0 : _a.avatarURL({ dynamic: true })) || "",
                });
                let menu = new discord_js_1.MessageSelectMenu();
                menu
                    .setCustomId("menu")
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("choose a category..");
                commands.forEach((cmd) => {
                    if (cmd.getCategory() == "base" && !utils.includes(cmd))
                        utils.push(cmd);
                    else if (cmd.getCategory() == "music" && !music.includes(cmd))
                        music.push(cmd);
                    else if (cmd.getCategory() == "admin" && !admin.includes(cmd))
                        admin.push(cmd);
                });
                menu.addOptions([
                    {
                        label: "admin",
                        value: "admin",
                        emoji: "🛠️",
                    },
                    {
                        label: "music",
                        value: "music",
                        emoji: require("../../../config.json").emojis.noteBlock,
                    },
                    {
                        label: "utils",
                        value: "utils",
                        emoji: "🔰",
                    },
                ]);
                let row = new discord_js_1.MessageActionRow();
                row.addComponents(menu);
                if (message == null)
                    interaction
                        .editReply({
                        content: "all of the bot commands: ",
                        embeds: [embed],
                        components: [row],
                    })
                        .then((m) => {
                        m.createMessageComponentCollector({
                            filter: (i) => i.user.id == author.id,
                            componentType: "SELECT_MENU",
                            time: 1000 * 60 * 5,
                        }).on("collect", (i) => __awaiter(this, void 0, void 0, function* () {
                            var _a, _b, _c;
                            yield i.deferUpdate().catch(() => { });
                            switch (i.values[0]) {
                                case "admin":
                                    {
                                        let embed = i.message.embeds[0];
                                        (_a = i.channel) === null || _a === void 0 ? void 0 : _a.messages.fetch(i.message.id).then((m) => {
                                            interaction.editReply({
                                                embeds: [
                                                    {
                                                        image: {
                                                            url: require("../../../config.json").images.adminMenu,
                                                        },
                                                        color: 0x4458f7,
                                                        author: embed.author,
                                                        description: admin
                                                            .map((cmd) => `\`${cmd.getName()}\``)
                                                            .join(", "),
                                                    },
                                                ],
                                            });
                                        });
                                    }
                                    break;
                                case "utils":
                                    {
                                        let embed = i.message.embeds[0];
                                        (_b = i.channel) === null || _b === void 0 ? void 0 : _b.messages.fetch(i.message.id).then((m) => {
                                            interaction.editReply({
                                                embeds: [
                                                    {
                                                        image: {
                                                            url: require("../../../config.json").images.utilsMenu,
                                                        },
                                                        color: 0x4458f7,
                                                        author: embed.author,
                                                        description: utils
                                                            .map((cmd) => `\`${cmd.getName()}\``)
                                                            .join(", "),
                                                    },
                                                ],
                                            });
                                        });
                                    }
                                    break;
                                case "music":
                                    {
                                        let embed = i.message.embeds[0];
                                        (_c = i.channel) === null || _c === void 0 ? void 0 : _c.messages.fetch(i.message.id).then((m) => {
                                            interaction.editReply({
                                                embeds: [
                                                    {
                                                        image: {
                                                            url: require("../../../config.json").images.musicMenu,
                                                        },
                                                        color: 0x4458f7,
                                                        author: embed.author,
                                                        description: music
                                                            .map((cmd) => `\`${cmd.getName()}\``)
                                                            .join(", "),
                                                    },
                                                ],
                                            });
                                        });
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }));
                    })
                        .catch(() => { });
                else
                    message
                        .edit({
                        content: "help menu is here: ",
                        embeds: [embed],
                        components: [row],
                    })
                        .then((m) => {
                        collector(m, author, admin, utils, music);
                    })
                        .catch(() => { });
            }
            else {
                let theCommand = client.commands.get(option);
                if (theCommand) {
                    let embed = new discord_js_1.MessageEmbed()
                        .setColor("#4458F7")
                        .setAuthor({
                        name: "~ CasperMusic.",
                        iconURL: ((_b = client.user) === null || _b === void 0 ? void 0 : _b.avatarURL({ dynamic: true })) || "",
                    })
                        .addField("Name:", theCommand.getName(), true)
                        .addField("Description:", theCommand.getDescription(), true)
                        .addField("Aliases:", String(theCommand.getAliases()), true);
                    if (message == null)
                        interaction
                            .editReply({
                            content: "Your help menu: ",
                            embeds: [embed],
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: "Your help menu: ",
                            embeds: [embed],
                        })
                            .catch(() => { });
                }
                else if (message == null)
                    interaction
                        .editReply({
                        content: replys.noCommandFound,
                    })
                        .catch(() => { });
                else
                    message
                        .edit({
                        content: replys.noCommandFound,
                    })
                        .catch(() => { });
            }
        });
    }
}
exports.default = HelpCommand;
