const readline = require('./util');
const service = require('./service');


class Presentation {
    constructor() {
        this.service = new service.Service();
        this.rl = new readline.Readline();
    }

    start() {
        console.log(`1. Rechercher un collègue par nom
2. Créer un collègue par nom
3. Modfier email
4. Modfier photoUrl
99. Sortir`);
        this.rl.question('Choix :').then(saisie => {
            saisie = saisie.trim();
            switch (saisie) {
                case '1' : {
                    this.findColleguesParNom();
                    break;
                }
                case '2' : {
                    this.createCollegue();
                    break;
                }
                case '3' : {
                    this.modifierEmail();
                    break;
                }
                case '4' : {
                    this.modifierPhotoUrl()
                    break;
                }
                case '99' : {
                    this.rl.close();
                    break;
                }
            }
        });
    }

    findColleguesParNom() {
        this.rl.question('nom :').then(saisie=>{
            return this.service.rechercherParNom(saisie);
        }).then(collegues=>{
            collegues.forEach(collegue => {
                this.afficherCollegue(collegue);
            });
            this.start();
        }).catch(err => console.log(err));
    }

    createCollegue() {
        let collegue = {};
        this.rl.question('nom :').then(nom=>{
            collegue.nom = nom;
            return this.rl.question('prenom :');
        }).then(prenom=>{
            collegue.prenoms = prenom;
            return this.rl.question('email :');
        }).then(email=>{
            collegue.email = email;
            return this.rl.question('date de naissance :')
        }).then(dateDeNaissance=>{
            collegue.dateDeNaissance = dateDeNaissance;
            return this.rl.question('Url de la photo :')
        }).then(photoUrl=>{
            collegue.photoUrl = photoUrl;
            return this.service.creerCollegue(collegue);
        }).then(body=>{
            console.log(body);
            this.start();
        }).catch(err => {
            console.log(err);
            this.createCollegue();
        });
    }

    modifierEmail() {
        let matricule;
        let listCollegues = [];
        this.rl.question('nom :').then(nom=>{
            return this.service.rechercherParNom(nom);
        }).then(collegues=>{
            listCollegues = collegues;
            collegues.forEach(function (value, index) {
                console.log(index + ": " + value.nom + " " + value.prenoms + " " + value.dateDeNaissance);
            });
            return this.rl.question('id :');
        }).then(id=>{
            if(id<listCollegues.length){
                matricule = listCollegues[id].matricule;
            }
            return this.rl.question('email :');
        }).then(email=>{
            return this.service.modfierEmail(matricule,email);
        }).then(body => {
            console.log(body);
            this.start();
        });
    }

    modifierPhotoUrl() {
        var photoUrl;
        var nom;
        rl.question('nom :', function (saisie) {
            nom = saisie;
            service.rechercherColleguesParNom(nom, function (colleguesTrouves) {
                if (colleguesTrouves instanceof Array) {
                    colleguesTrouves.forEach(function (value, index, array) {
                        console.log(index + ": " + value.nom + " " + value.prenoms + " " + value.dateDeNaissance)
                    });
                    rl.question('id :', function (saisie) {
                        var id = saisie;
                        if (id < colleguesTrouves.length) {
                            var matricule = colleguesTrouves[id].matricule;
                            rl.question('photoUrl :', function (saisie) {
                                photoUrl = saisie;
                                service.modifierPhotoUrl(matricule, photoUrl, function (res, body) {
                                    console.log(res.statusCode);
                                    console.log(body);
                                    start();
                                });
                            })
                        }
                        modifierPhotoUrl();
                    });
                }
                modifierPhotoUrl();
            });

        })
    }

    afficherCollegue(collegue) {
        console.log(collegue.nom + ' ' + collegue.prenoms + ' ' + collegue.email + ' (' + collegue.dateDeNaissance + ')');
    }

}


exports.Presentation = Presentation;