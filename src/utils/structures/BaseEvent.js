"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEvent {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
exports.default = BaseEvent;
