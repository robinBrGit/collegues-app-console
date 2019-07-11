"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("./util"));
var service_1 = __importDefault(require("./service"));
var Presentation = /** @class */ (function () {
    function Presentation() {
        this.service = new service_1.default();
        this.rl = new util_1.default();
    }
    Presentation.prototype.start = function () {
        var _this = this;
        console.log("1. Rechercher un coll\u00E8gue par nom\n2. Cr\u00E9er un coll\u00E8gue par nom\n3. Modfier email\n4. Modfier photoUrl\n99. Sortir");
        this.rl.question('Choix :').then(function (saisie) {
            saisie = saisie.trim();
            switch (saisie) {
                case '1': {
                    _this.findColleguesParNom();
                    break;
                }
                case '2': {
                    _this.createCollegue();
                    break;
                }
                case '3': {
                    _this.modifierEmail();
                    break;
                }
                case '4': {
                    _this.modifierPhotoUrl();
                    break;
                }
                case '99': {
                    _this.rl.close();
                    break;
                }
            }
        });
    };
    Presentation.prototype.findColleguesParNom = function () {
        var _this = this;
        this.rl.question('nom :').then(function (saisie) {
            return _this.service.rechercherParNom(saisie);
        }).then(function (collegues) {
            collegues.forEach(function (collegue) {
                Presentation.afficherCollegue(collegue);
            });
            _this.start();
        }).catch(function (err) { return console.log(err); });
    };
    Presentation.prototype.createCollegue = function () {
        var _this = this;
        var collegue = {};
        this.rl.question('nom :').then(function (nom) {
            collegue.nom = nom;
            return _this.rl.question('prenom :');
        }).then(function (prenom) {
            collegue.prenoms = prenom;
            return _this.rl.question('email :');
        }).then(function (email) {
            collegue.email = email;
            return _this.rl.question('date de naissance :');
        }).then(function (dateDeNaissance) {
            collegue.dateDeNaissance = dateDeNaissance;
            return _this.rl.question('Url de la photo :');
        }).then(function (photoUrl) {
            collegue.photoUrl = photoUrl;
            return _this.service.creerCollegue(collegue);
        }).then(function (body) {
            console.log(body);
            _this.start();
        }).catch(function (err) {
            console.log(err);
            _this.createCollegue();
        });
    };
    Presentation.prototype.modifierEmail = function () {
        var _this = this;
        var matricule;
        var listCollegues = [];
        this.rl.question('nom :').then(function (nom) {
            return _this.service.rechercherParNom(nom);
        }).then(function (collegues) {
            listCollegues = collegues;
            collegues.forEach(function (value, index) {
                console.log(index + ": " + value.nom + " " + value.prenoms + " " + value.dateDeNaissance);
            });
            return _this.rl.question('id :');
        }).then(function (id) {
            if (id < listCollegues.length) {
                matricule = listCollegues[id].matricule;
            }
            return _this.rl.question('email :');
        }).then(function (email) {
            return _this.service.modfierEmail(matricule, email);
        }).then(function (body) {
            console.log(body);
            _this.start();
        }).catch(function (err) {
            console.log(err.message);
            _this.modifierEmail();
        });
    };
    Presentation.prototype.modifierPhotoUrl = function () {
        var _this = this;
        var matricule;
        var listCollegues = [];
        this.rl.question('nom :').then(function (nom) {
            return _this.service.rechercherParNom(nom);
        }).then(function (collegues) {
            listCollegues = collegues;
            collegues.forEach(function (value, index) {
                console.log(index + ": " + value.nom + " " + value.prenoms + " " + value.dateDeNaissance);
            });
            return _this.rl.question('id :');
        }).then(function (id) {
            if (id < listCollegues.length) {
                matricule = listCollegues[id].matricule;
            }
            return _this.rl.question('photo url :');
        }).then(function (photoUrl) {
            return _this.service.modfierPhotoUrl(matricule, photoUrl);
        }).then(function (body) {
            console.log(body);
            _this.start();
        }).catch(function (err) {
            console.log(err.message);
            _this.modifierPhotoUrl();
        });
    };
    Presentation.afficherCollegue = function (collegue) {
        console.log(collegue.nom + " " + collegue.prenoms + " " + collegue.email + " (" + collegue.dateDeNaissance + ")");
    };
    return Presentation;
}());
exports.default = Presentation;
