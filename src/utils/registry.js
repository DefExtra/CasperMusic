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
exports.registerMusicEvents = exports.registerEvents = exports.registerSlashCommands = exports.registerCommands = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
function registerCommands(client, dir = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, dir);
        const files = yield fs_1.promises.readdir(filePath);
        for (const file of files) {
            const stat = yield fs_1.promises.lstat(path_1.default.join(filePath, file));
            if (stat.isDirectory())
                registerCommands(client, path_1.default.join(dir, file));
            if (file.endsWith(".js") || file.endsWith(".ts")) {
                const { default: Command } = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(dir, file))));
                const command = new Command();
                client.commands.set(command.getName(), command);
                command.getAliases().forEach((alias) => {
                    client.commands.set(alias, command);
                });
            }
        }
    });
}
exports.registerCommands = registerCommands;
function registerSlashCommands(client, dir = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, dir);
        const files = yield fs_1.promises.readdir(filePath);
        const arrayOfData = [];
        arrayOfData.push({
            name: "add_to_queue",
            type: "MESSAGE",
        });
        for (const file of files) {
            const stat = yield fs_1.promises.lstat(path_1.default.join(filePath, file));
            if (stat.isDirectory())
                registerSlashCommands(client, path_1.default.join(dir, file));
            if (file.endsWith(".js") || file.endsWith(".ts")) {
                const { default: Command } = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(dir, file))));
                const command = new Command();
                let slashData = command.getSlashData();
                arrayOfData.push(slashData);
            }
        }
        client.on("ready", () => __awaiter(this, void 0, void 0, function* () {
            yield arrayOfData.forEach((cmd) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = client.application) === null || _a === void 0 ? void 0 : _a.commands.create(cmd));
            }));
        }));
    });
}
exports.registerSlashCommands = registerSlashCommands;
function registerEvents(client, dir = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, dir);
        const files = yield fs_1.promises.readdir(filePath);
        for (const file of files) {
            const stat = yield fs_1.promises.lstat(path_1.default.join(filePath, file));
            if (stat.isDirectory())
                registerEvents(client, path_1.default.join(dir, file));
            if (file.endsWith(".js") || file.endsWith(".ts")) {
                const { default: Event } = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(dir, file))));
                const event = new Event();
                client.events.set(event.getName(), event);
                client.on(event.getName(), event.run.bind(event, client));
            }
        }
    });
}
exports.registerEvents = registerEvents;
function registerMusicEvents(client, dir = "") {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, dir);
        const files = yield fs_1.promises.readdir(filePath);
        for (const file of files) {
            const { default: Event } = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(dir, file))));
            const event = new Event();
            //manager.getEvents().set(event.getName(), event);
            (_a = client.manager) === null || _a === void 0 ? void 0 : _a.on(event.getName(), event.run.bind(event, client));
        }
    });
}
exports.registerMusicEvents = registerMusicEvents;
