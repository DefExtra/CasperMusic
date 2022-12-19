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
exports.superQuickTrueOrFalseCheck = exports.superQuickPlayingCheck = exports.superQuickVoiceCheck = void 0;
function superQuickVoiceCheck(i) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_b = (_a = i.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(i.user.id)) === null || _b === void 0 ? void 0 : _b.voice.channel) ||
            ((_d = (_c = i.guild) === null || _c === void 0 ? void 0 : _c.members.cache.get(i.user.id)) === null || _d === void 0 ? void 0 : _d.voice.channelId) ==
                ((_f = (_e = i.guild) === null || _e === void 0 ? void 0 : _e.me) === null || _f === void 0 ? void 0 : _f.voice.channelId))
            return true;
        else
            return false;
    });
}
exports.superQuickVoiceCheck = superQuickVoiceCheck;
function superQuickPlayingCheck(client, i) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let player = (_a = client.manager) === null || _a === void 0 ? void 0 : _a.players.get(i.guildId || "");
        if ((player === null || player === void 0 ? void 0 : player.queue.current) && player)
            return true;
        else
            return false;
    });
}
exports.superQuickPlayingCheck = superQuickPlayingCheck;
function superQuickTrueOrFalseCheck(bol, bol2) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bol == true && bol2 == true)
            return true;
        else
            return false;
    });
}
exports.superQuickTrueOrFalseCheck = superQuickTrueOrFalseCheck;
