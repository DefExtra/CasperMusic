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
function voiceCheck(base, author) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let member = (_a = base.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(author.id);
        if (!(member === null || member === void 0 ? void 0 : member.voice.channel))
            return "notInVoiceChannel";
        if ((_c = (_b = base.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.voice.channel) {
            if (base.guild.me.voice.channelId !== (member === null || member === void 0 ? void 0 : member.voice.channelId))
                return "notInTheSameVoiceChannel";
        }
    });
}
exports.default = voiceCheck;
