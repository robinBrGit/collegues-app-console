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

function afficherCollegue(collegue){
    console.log(collegue.nom+' '+collegue.prenoms+' ('+collegue.dateDeNaissance+')');
}

exports.start = start;