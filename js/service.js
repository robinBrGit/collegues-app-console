"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.rechercherParNom = function (nomRecherche) {
        return request_promise_native_1.default("https://robin-br-collegues-api.herokuapp.com/collegues?nom=" + nomRecherche, { json: true })
            .then(function (maticules) { return Promise.all(maticules.map(function (value) { return request_promise_native_1.default("https://robin-br-collegues-api.herokuapp.com/collegues/" + value, { json: true }); })); });
        // retourne une promesse
    };
    Service.prototype.creerCollegue = function (collegue) {
        return request_promise_native_1.default("https://robin-br-collegues-api.herokuapp.com/collegues", {
            method: 'POST', json: true, body: {
                "nom": collegue.nom,
                "prenoms": collegue.prenoms,
                "email": collegue.email,
                "dateDeNaissance": collegue.dateDeNaissance,
                "photoUrl": collegue.photoUrl
            }
        });
    };
    Service.prototype.modfierEmail = function (matricule, email) {
        return request_promise_native_1.default("https://robin-br-collegues-api.herokuapp.com/collegues/" + matricule, {
            method: 'PATCH', json: true, body: {
                "email": email
            }
        });
    };
    Service.prototype.modfierPhotoUrl = function (matricule, photoUrl) {
        return request_promise_native_1.default("https://robin-br-collegues-api.herokuapp.com/collegues/" + matricule, {
            method: 'PATCH', json: true, body: {
                "photoUrl": photoUrl
            }
        });
    };
    return Service;
}());
exports.default = Service;
