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
function playMusic(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let { resultRespond, base, client, player } = data;
        switch (resultRespond === null || resultRespond === void 0 ? void 0 : resultRespond.loadType) {
            case "LOAD_FAILED":
                {
                    if (!player || !player.queue.current)
                        player === null || player === void 0 ? void 0 : player.destroy();
                    return "failed to load data.";
                }
                break;
            case "NO_MATCHES":
                {
                    if (!player || !player.queue.current)
                        player === null || player === void 0 ? void 0 : player.destroy();
                    return "failed to found data.";
                }
                break;
            case "PLAYLIST_LOADED":
                {
                    yield (player === null || player === void 0 ? void 0 : player.queue.add(resultRespond.tracks));
                    if (!(player === null || player === void 0 ? void 0 : player.playing) && !(player === null || player === void 0 ? void 0 : player.paused) && !(player === null || player === void 0 ? void 0 : player.queue.size))
                        yield (player === null || player === void 0 ? void 0 : player.play());
                    if (!(player === null || player === void 0 ? void 0 : player.playing) &&
                        !(player === null || player === void 0 ? void 0 : player.paused) &&
                        (player === null || player === void 0 ? void 0 : player.queue.totalSize) === (resultRespond === null || resultRespond === void 0 ? void 0 : resultRespond.tracks.length))
                        yield (player === null || player === void 0 ? void 0 : player.play());
                }
                break;
            case "SEARCH_RESULT":
                {
                    let track = resultRespond.tracks[0];
                    yield (player === null || player === void 0 ? void 0 : player.queue.add(track));
                    if (!(player === null || player === void 0 ? void 0 : player.playing) && !(player === null || player === void 0 ? void 0 : player.paused) && !(player === null || player === void 0 ? void 0 : player.queue.size))
                        yield (player === null || player === void 0 ? void 0 : player.play());
                    if (!(player === null || player === void 0 ? void 0 : player.playing) &&
                        !(player === null || player === void 0 ? void 0 : player.paused) &&
                        (player === null || player === void 0 ? void 0 : player.queue.totalSize) === (resultRespond === null || resultRespond === void 0 ? void 0 : resultRespond.tracks.length))
                        yield (player === null || player === void 0 ? void 0 : player.play());
                }
                break;
            case "TRACK_LOADED":
                {
                    let track = resultRespond.tracks[0];
                    yield (player === null || player === void 0 ? void 0 : player.queue.add(track));
                    if (!(player === null || player === void 0 ? void 0 : player.playing) && !(player === null || player === void 0 ? void 0 : player.paused) && !(player === null || player === void 0 ? void 0 : player.queue.size))
                        yield (player === null || player === void 0 ? void 0 : player.play());
                    if (!(player === null || player === void 0 ? void 0 : player.playing) &&
                        !(player === null || player === void 0 ? void 0 : player.paused) &&
                        (player === null || player === void 0 ? void 0 : player.queue.totalSize) === (resultRespond === null || resultRespond === void 0 ? void 0 : resultRespond.tracks.length))
                        yield (player === null || player === void 0 ? void 0 : player.play());
                }
                break;
            default:
                break;
        }
    });
}
exports.default = playMusic;
