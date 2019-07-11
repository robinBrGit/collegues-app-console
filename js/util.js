"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var Readline = /** @class */ (function () {
    function Readline() {
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    Readline.prototype.question = function (saisie) {
        var rl = this.rl;
        return new Promise(function (resolve, reject) {
            rl.question(saisie, function (reponse) { return resolve(reponse); });
        });
    };
    Readline.prototype.close = function () {
        this.rl.close();
    };
    return Readline;
}());
exports.default = Readline;
exports.Readline = Readline;
