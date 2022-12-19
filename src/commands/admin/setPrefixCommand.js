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
const config_json_1 = __importDefault(require("../../../config.json"));
const quick_db_1 = __importDefault(require("quick.db"));
const commandName = "set-prefix";
class SetupCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "admin", ["prefix"], {
            name: commandName,
            description: "change the bot prefix in your server",
            type: "CHAT_INPUT",
            options: [
                {
                    name: "prefix",
                    description: "the new prefix",
                    required: false,
                    type: "STRING",
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
            let option;
            if (interaction == null)
                option = args[0];
            else
                option = interaction.options.getString("prefix");
            if (option == null || !option || option == undefined)
                quick_db_1.default.set(`Prefix_${base.guildId}`, config_json_1.default.prefix);
            else
                quick_db_1.default.set(`Prefix_${base.guildId}`, option);
            if (message == null)
                interaction
                    .editReply({
                    content: replys.donePrefixChanged.replace("{data[prefix]}", option || config_json_1.default.prefix),
                })
                    .catch(() => { });
            else
                message
                    .edit({
                    content: replys.donePrefixChanged.replace("{data[prefix]}", option || config_json_1.default.prefix),
                })
                    .catch(() => { });
        });
    }
}
exports.default = SetupCommand;
