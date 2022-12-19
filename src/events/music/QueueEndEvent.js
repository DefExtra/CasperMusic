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
const BaseMusicEvent_1 = __importDefault(require("../../utils/structures/BaseMusicEvent"));
const quick_db_1 = __importDefault(require("quick.db"));
const discord_js_1 = require("discord.js");
class QueueEndEvent extends BaseMusicEvent_1.default {
    constructor() {
        super("queueEnd");
    }
    run(client, player, track) {
        return __awaiter(this, void 0, void 0, function* () {
            quick_db_1.default.set(`LastTrack_${player.guild}`, null);
            if (quick_db_1.default.fetch(`LE_${player.guild}`) == true)
                player.destroy();
            let data = quick_db_1.default.fetch(`Channel_${player.guild}`);
            if (data == null)
                return;
                console.log(player.guild)
            let guild = client.guilds.cache.get(player.guild);
            let channel = guild === null || guild === void 0 ? void 0 : guild.channels.cache.get(player.textChannel || "");
            if (channel)
                channel.messages.fetch(data === null || data === void 0 ? void 0 : data.messsageId).then((msg) => {
                    let Embed = new discord_js_1.MessageEmbed().setColor("#4458F7")
                        .setTitle(`**No song playing currently**`)
                        .setDescription("Casper is a scary toune for your server.")
                        .setFooter({
                        text: "all the bot commands woking with slashcommands or the normal prefix",
                    })
                        .setImage(require("../../../config.json").images.quickPlay);
                    msg
                        .edit({
                        content: "**__Queue list__**:\nJoin a voice channel and queue songs by name or url in here.",
                        embeds: [Embed],
                    })
                        .catch(() => { });
                }).catch(() => { });
        });
    }
}
exports.default = QueueEndEvent;
