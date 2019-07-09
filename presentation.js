var readline = require('readline');
var service = require('./service');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    console.log("1. Rechercher un collègue par nom");
    console.log("2. Créer un collègue par nom");
    console.log("99. Sortir");
    rl.question('Choix : ', function (saisie) {
        switch (saisie) {
            case '1' : {
                findColleguesParNom();
                break;
            }
            case '2' : {
                createCollegue();
                break;
            }
            case '99' : {
                rl.close();
                break;
            }
        }
    })
}

function findColleguesParNom() {
    rl.question('nom : ',function (saisie) {
        service.rechercherColleguesParNom(saisie, function (colleguesTrouves) {
            colleguesTrouves.forEach(function (collegue) {
                afficherCollegue(collegue);
            });
            start();
        });
    });
}

function createCollegue() {
    var collegue = {};
    rl.question('nom :',function (nom) {
        collegue.nom = nom;
        rl.question('prenom :',function (prenom) {
            collegue.prenoms = prenom;
            rl.question('email :',function (email) {
                collegue.email = email;
                rl.question('date de naissance :',function (dateDeNaissance) {
                    collegue.dateDeNaissance = dateDeNaissance;
                    rl.question('Url de la photo :',function (photoUrl) {
                        collegue.photoUrl = photoUrl;
                        service.creerCollegue(collegue,function (res,body) {
                            console.log(res);
                            console.log(body);
                            start();
                        });
                    })
                })
            })
        })
    })
}

function afficherCollegue(collegue){
    console.log(collegue.nom+' '+collegue.prenoms+' ('+collegue.dateDeNaissance+')');
}

exports.start = start;