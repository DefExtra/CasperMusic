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
Object.defineProperty(exports, "__esModule", { value: true });
function checkPlayer(data) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let { author, base, client } = data;
        let member = (_a = base.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(author.id);
        let guild = client.guilds.cache.get((base === null || base === void 0 ? void 0 : base.guildId) || "") || {
            id: String(null),
        };
        let player = yield ((_b = client.manager) === null || _b === void 0 ? void 0 : _b.players.get(guild === null || guild === void 0 ? void 0 : guild.id));
        if (!player) {
            player = yield ((_c = client.manager) === null || _c === void 0 ? void 0 : _c.create({
                guild: guild.id,
                textChannel: base.channelId,
                voiceChannel: (member === null || member === void 0 ? void 0 : member.voice.channelId) || String(null),
                volume: 70,
                selfDeafen: true,
                selfMute: false,
            }));
        }
        if ((player === null || player === void 0 ? void 0 : player.state) !== "CONNECTED")
            yield (player === null || player === void 0 ? void 0 : player.connect());
        return player;
    });
}
exports.default = checkPlayer;
