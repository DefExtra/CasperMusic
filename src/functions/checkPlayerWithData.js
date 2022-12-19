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
function checkPlayerWithData(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let { client, voiceChannelId, textChannelId, guildId } = data;
        let player = yield ((_a = client.manager) === null || _a === void 0 ? void 0 : _a.players.get(guildId));
        if (!player) {
            player = yield ((_b = client.manager) === null || _b === void 0 ? void 0 : _b.create({
                guild: guildId,
                textChannel: textChannelId || String(null),
                voiceChannel: voiceChannelId || String(null),
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
exports.default = checkPlayerWithData;
