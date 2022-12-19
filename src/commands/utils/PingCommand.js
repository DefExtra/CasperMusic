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
const BaseCommand_1 = __importDefault(require("../../utils/structures/BaseCommand"));
const commandName = "ping";
class PingCommand extends BaseCommand_1.default {
    constructor() {
        super(commandName, "base", ["pong"], {
            name: commandName,
            description: "ping pong test",
            type: "CHAT_INPUT",
            options: [],
        });
    }
    run(client, interaction, message, args, author) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // the base you will use it to reply, acess the user object etc...
            let base = message ? message : interaction;
            // the code
            (_a = base.channel) === null || _a === void 0 ? void 0 : _a.send("pinging...").then((m) => {
                let content = `api: ${Date.now() - base.createdTimestamp}ms\nrespond: ${m.createdTimestamp - base.createdTimestamp}ms\nwebsocet: ${client.ws.ping}ms`;
                if (interaction == null)
                    message.edit({ content }).catch(() => { });
                else
                    interaction.editReply({ content }).catch(() => { });
            });
        });
    }
}
exports.default = PingCommand;
