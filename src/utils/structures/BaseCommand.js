"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseCommand {
    constructor(name, category, aliases, slash) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.slash = slash;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        var _a;
        return (_a = this.slash) === null || _a === void 0 ? void 0 : _a.description;
    }
    getCategory() {
        return this.category;
    }
    getAliases() {
        return this.aliases;
    }
    getSlashData() {
        return this.slash;
    }
}
exports.default = BaseCommand;
