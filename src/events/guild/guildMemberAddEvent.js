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
const discord_js_1 = require("discord.js");
class QueueEndEvent extends BaseMusicEvent_1.default {
    constructor() {
        super("guildMemberAdd");
    }
    run(client, member) {
        return __awaiter(this, void 0, void 0, function* () {
            member
                .send({
                embeds: [
                    {
                        description: `> **Welcome, there is casper.**`,
                        color: 0x4458f7,
                    },
                ],
                components: [
                    new discord_js_1.MessageActionRow().setComponents([
                        new discord_js_1.MessageButton()
                            .setStyle("LINK")
                            .setLabel("Join the support.")
                            .setURL("https://discord.gg/ws9jA2cR5s"),
                        new discord_js_1.MessageButton()
                            .setStyle("LINK")
                            .setLabel("Invite The Bot.")
                            .setURL("https://discord.com/oauth2/authorize?client_id=951194810553884672&permissions=1522871430512&scope=bot%20applications.commands"),
                    ]),
                ],
            })
                .catch(() => { });
        });
    }
}
exports.default = QueueEndEvent;
