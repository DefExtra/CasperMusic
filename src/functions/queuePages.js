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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queuePages = void 0;
const discord_js_1 = require("discord.js");
function queuePages(client, message, embeds, buttonStyle, ButtonHome, ButtonDelete) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const wait = (yield Promise.resolve().then(() => __importStar(require("util")))).promisify(setTimeout);
        const fowardButton = new discord_js_1.MessageButton()
            .setStyle(buttonStyle)
            .setLabel("▶")
            .setCustomId("next-page");
        const backButton = new discord_js_1.MessageButton()
            .setStyle(buttonStyle)
            .setLabel("◀")
            .setCustomId("back-page");
        const deleteButton = new discord_js_1.MessageButton()
            .setStyle(buttonStyle)
            .setEmoji("✖")
            .setCustomId("delete-page");
        let interactiveButtons;
        if (ButtonHome == true && ButtonDelete == true) {
            interactiveButtons = new discord_js_1.MessageActionRow()
                .addComponents(backButton)
                .addComponents(deleteButton)
                .addComponents(fowardButton);
        }
        if (ButtonHome == true && ButtonDelete == false) {
            interactiveButtons = new discord_js_1.MessageActionRow()
                .addComponents(backButton)
                .addComponents(fowardButton);
        }
        if (ButtonHome == false && ButtonDelete == true) {
            interactiveButtons = new discord_js_1.MessageActionRow()
                .addComponents(backButton)
                .addComponents(deleteButton)
                .addComponents(fowardButton);
        }
        if (ButtonHome == false && ButtonDelete == false) {
            interactiveButtons = new discord_js_1.MessageActionRow()
                .addComponents(backButton)
                .addComponents(fowardButton);
        }
        let msg_delete = "the command has closed!";
        let currentPage = 0;
        const Pagemax = embeds.length;
        embeds[currentPage].setFooter({
            text: `${currentPage + 1}/${Pagemax} - By ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`,
            iconURL: (_b = client.user) === null || _b === void 0 ? void 0 : _b.displayAvatarURL({ dynamic: true }),
        });
        const msg = yield ((_c = message === null || message === void 0 ? void 0 : message.channel) === null || _c === void 0 ? void 0 : _c.send({
            components: [interactiveButtons],
            embeds: [embeds[0]],
        }));
        message = msg;
        embeds = embeds;
        const components = interactiveButtons;
        const collector = msg === null || msg === void 0 ? void 0 : msg.createMessageComponentCollector({
            time: 1000 * 60 * 60,
        });
        collector.on("collect", (b) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e, _f, _g, _h, _j;
            yield b.deferUpdate().catch(() => { });
            if (b.customId == "next-page") {
                currentPage + 1 == embeds.length
                    ? (currentPage = 0)
                    : (currentPage += 1);
                embeds[currentPage].setFooter({
                    text: `${currentPage + 1}/${Pagemax} - By ${(_d = client.user) === null || _d === void 0 ? void 0 : _d.tag}`,
                    iconURL: (_e = client.user) === null || _e === void 0 ? void 0 : _e.displayAvatarURL({ dynamic: true }),
                });
                message.edit({
                    embeds: [embeds[currentPage]],
                    components: [components],
                });
            }
            if (b.customId == "back-page") {
                currentPage - 1 < 0
                    ? (currentPage = embeds.length - 1)
                    : (currentPage -= 1);
                embeds[currentPage].setFooter({
                    text: `${currentPage + 1}/${Pagemax} - By ${(_f = client.user) === null || _f === void 0 ? void 0 : _f.tag}`,
                    iconURL: (_g = client.user) === null || _g === void 0 ? void 0 : _g.displayAvatarURL({ dynamic: true }),
                });
                message.edit({
                    embeds: [embeds[currentPage]],
                    components: [components],
                });
            }
            if (b.customId == "delete-page") {
                message.edit({ content: msg_delete, embeds: [], components: [] });
                wait(10000).then(() => __awaiter(this, void 0, void 0, function* () {
                    yield message.delete().catch(() => { });
                }));
            }
            if (b.customId == "home-page") {
                const currentPage = 0;
                embeds[currentPage].setFooter({
                    text: `${currentPage + 1}/${Pagemax} - By ${(_h = client.user) === null || _h === void 0 ? void 0 : _h.tag}`,
                    iconURL: (_j = client.user) === null || _j === void 0 ? void 0 : _j.displayAvatarURL({ dynamic: true }),
                });
                message.edit({ embeds: [embeds[0]], components: [components] });
            }
        }));
    });
}
exports.queuePages = queuePages;
