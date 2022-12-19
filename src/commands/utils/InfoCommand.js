"use strict";
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
const package_json_1 = __importDefault(require("../../../package.json"));
const moment_1 = require("moment");
const ms_1 = __importDefault(require("ms"));
const os_1 = __importDefault(require("os"));
const commandName = "info";
class PlayCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "base", [], {
            name: commandName,
            description: "get info for the bot, system and the player",
            type: "CHAT_INPUT",
            options: [],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            var usedMemory = os_1.default.totalmem() - os_1.default.freemem(), totalMemory = os_1.default.totalmem();
            var getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + "%";
            var node = (_a = client.manager) === null || _a === void 0 ? void 0 : _a.nodes.map((node) => node)[0];
            let Embed = new discord_js_1.MessageEmbed({
                color: 0x4458F7,
                author: {
                    name: ((_b = client.user) === null || _b === void 0 ? void 0 : _b.tag) || "",
                    icon_url: ((_c = client.user) === null || _c === void 0 ? void 0 : _c.avatarURL({ dynamic: true })) || "",
                },
                fields: [
                    {
                        name: "General :",
                        value: `**❯ Client:** ${(_d = client.user) === null || _d === void 0 ? void 0 : _d.tag} (${(_e = client.user) === null || _e === void 0 ? void 0 : _e.id})\n` +
                            `**❯ Commands:** ${client.commands.size}\n` +
                            `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} \n` +
                            `**❯ Users:** ${client.guilds.cache
                                .reduce((a, b) => a + b.memberCount, 0)
                                .toLocaleString()} \n` +
                            `**❯ Channels:** ${client.channels.cache.size.toLocaleString()} \n` +
                            `**❯ Creation Date:** ${(0, moment_1.utc)((_f = client.user) === null || _f === void 0 ? void 0 : _f.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")} \n` +
                            `**❯ Node.js:** ${process.version} \n` +
                            `**❯ Version:** v${package_json_1.default.version} \n` +
                            `**❯ Discord.js:** v${package_json_1.default.dependencies["discord.js"]} \n`,
                        inline: true,
                    },
                    {
                        name: "System :",
                        value: `**❯ Platform:** ${process.platform} \n` +
                            `**❯ Uptime:** ${(0, ms_1.default)(os_1.default.uptime() * 1000, { long: true })} \n` +
                            `**❯ CPU:** \n` +
                            `\u3000 Cores: ${os_1.default.cpus().length} \n` +
                            `\u3000 Model: ${os_1.default.cpus()[0].model} \n` +
                            `\u3000 Speed: ${os_1.default.cpus()[0].speed}MHz \n` +
                            `**❯ Memory: ${getpercentage}** \n` +
                            `\u3000 Total: ${Math.round(os_1.default.totalmem() / 1024 / 1024)} MB \n` +
                            `\u3000 Free: ${Math.round(require('os').freemem() / 1024 / 1024)} MB \n` +
                            `\u3000 Used: ${(process.memoryUsage().heapUsed /
                                1024 /
                                1024).toFixed(2)} MB`,
                        inline: true,
                    },
                    {
                        name: "Player :",
                        value: `**❯ Status:** ${(node === null || node === void 0 ? void 0 : node.connected) ? "🟢 OK" : "🔴 BAD"} \n` +
                            `**❯ Players:** ${node === null || node === void 0 ? void 0 : node.stats.players} \n` +
                            `**❯ Playing Players:** ${node === null || node === void 0 ? void 0 : node.stats.playingPlayers} \n` +
                            `**❯ Uptime:** ${(0, moment_1.utc)(node === null || node === void 0 ? void 0 : node.stats.uptime).format("Do MMMM YYYY HH:mm:ss")} \n` +
                            `**❯ CPU:** \n` +
                            `\u3000 Cores: ${node === null || node === void 0 ? void 0 : node.stats.cpu.cores} \n` +
                            `\u3000 System Load: ${node === null || node === void 0 ? void 0 : node.stats.cpu.systemLoad} \n` +
                            `\u3000 Lavalink Load: ${node === null || node === void 0 ? void 0 : node.stats.cpu.lavalinkLoad}MHz \n`,
                        inline: true,
                    },
                ],
            });
            if (message == null)
                interaction
                    .editReply({
                    content: "Bot Status:",
                    embeds: [Embed],
                })
                    .catch(() => { });
            else
                message
                    .edit({
                    content: "Bot Status:",
                    embeds: [Embed],
                })
                    .catch(() => { });
        });
    }
}
exports.default = PlayCommand;
