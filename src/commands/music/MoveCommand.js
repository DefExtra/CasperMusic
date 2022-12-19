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
const checkVoice_1 = __importDefault(require("../../functions/checkVoice"));
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const replys_json_1 = __importDefault(require("../../../replys.json"));
const commandName = "move";
class StopCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "music", [], {
            name: commandName,
            description: "move a song to another song.",
            type: "CHAT_INPUT",
            options: [
                {
                    name: "position_one",
                    description: "the track you will move.",
                    type: "NUMBER",
                    required: true,
                },
                {
                    name: "position_two",
                    description: "the track you replace with 'position_one' option.",
                    type: "NUMBER",
                    required: true,
                },
            ],
        });
    }
    run(client, interaction, message, args, author) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function* () {
            let base = message ? message : interaction;
            let lang = (yield Promise.resolve().then(() => __importStar(require("quick.db")))).fetch(`Lang_${base.guildId}`) || "en";
            let replys = replys_json_1.default[lang];
            if (((_c = (_a = client.manager) === null || _a === void 0 ? void 0 : _a.players.get(((_b = base.guild) === null || _b === void 0 ? void 0 : _b.id) || "")) === null || _c === void 0 ? void 0 : _c.queue.current) &&
                (yield (0, checkVoice_1.default)(base, author)) !== "notInTheSameVoiceChannel" &&
                (yield (0, checkVoice_1.default)(base, author)) !== "notInVoiceChannel") {
                let player = (_d = client.manager) === null || _d === void 0 ? void 0 : _d.players.get(((_e = base.guild) === null || _e === void 0 ? void 0 : _e.id) || "");
                let optionOne;
                let optionTwo;
                if (interaction == null) {
                    optionOne = args[0];
                    optionTwo = args[1];
                }
                else {
                    optionOne = interaction.options.getNumber("position_one");
                    optionTwo = interaction.options.getNumber("position_two");
                }
                if (!optionOne || optionOne == null || !optionTwo || optionTwo == null) {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.moveCMDuseg,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.moveCMDuseg,
                        })
                            .catch(() => { });
                    return;
                }
                let check = player === null || player === void 0 ? void 0 : player.queue;
                if (!((_f = check[optionOne]) === null || _f === void 0 ? void 0 : _f.title) ||
                    !((_g = check[optionOne]) === null || _g === void 0 ? void 0 : _g.title) == null ||
                    !((_h = check[optionOne]) === null || _h === void 0 ? void 0 : _h.title) == undefined) {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.moveCMDusegONE,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.moveCMDusegONE,
                        })
                            .catch(() => { });
                    return;
                }
                if (!((_j = check[optionTwo]) === null || _j === void 0 ? void 0 : _j.title) ||
                    !((_k = check[optionTwo]) === null || _k === void 0 ? void 0 : _k.title) == null ||
                    !((_l = check[optionTwo]) === null || _l === void 0 ? void 0 : _l.title) == undefined) {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.moveCMDusegTWO,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.moveCMDusegTWO,
                        })
                            .catch(() => { });
                    return;
                }
                let newQueueArray = [];
                for (let index = 0; index < (player ? player === null || player === void 0 ? void 0 : player.queue.length : ""); index++) {
                    const element = player === null || player === void 0 ? void 0 : player.queue[index];
                    if (index == optionTwo)
                        newQueueArray.push(player === null || player === void 0 ? void 0 : player.queue[optionOne]);
                    else if (index == optionOne)
                        newQueueArray.push(player === null || player === void 0 ? void 0 : player.queue[optionTwo]);
                    else
                        newQueueArray.push(element);
                }
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield (player === null || player === void 0 ? void 0 : player.queue.clear());
                    newQueueArray.forEach((track) => {
                        player === null || player === void 0 ? void 0 : player.queue.add(track);
                    });
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.doneMoved.replace("{number1}", optionOne).replace("{number2}", optionTwo),
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.doneMoved.replace("{number2}", optionTwo).replace("{number1}", optionOne),
                        })
                            .catch(() => { });
                }), 2421);
            }
            else {
                if (!((_p = (_m = client.manager) === null || _m === void 0 ? void 0 : _m.players.get(((_o = base.guild) === null || _o === void 0 ? void 0 : _o.id) || "")) === null || _p === void 0 ? void 0 : _p.queue.current)) {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.noPlayingMusic,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.noPlayingMusic,
                        })
                            .catch(() => { });
                    return;
                }
                else if ((yield (0, checkVoice_1.default)(base, author)) == "notInVoiceChannel") {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.notInVoiceChannel,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.notInVoiceChannel,
                        })
                            .catch(() => { });
                    return;
                }
                else if ((yield (0, checkVoice_1.default)(base, author)) == "notInTheSameVoiceChannel") {
                    if (message == null)
                        interaction
                            .editReply({
                            content: replys.notInTheSameVoiceChannel,
                        })
                            .catch(() => { });
                    else
                        message
                            .edit({
                            content: replys.notInTheSameVoiceChannel,
                        })
                            .catch(() => { });
                    return;
                }
            }
        });
    }
}
exports.default = StopCommand;
