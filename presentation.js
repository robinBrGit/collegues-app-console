var readline = require('readline');
var service = require('./service');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    console.log("1. Rechercher un collègue par nom");
    console.log("2. Créer un collègue par nom");
    console.log("3. Modfier email");
    console.log("4. Modfier photoUrl");
    console.log("99. Sortir");
    rl.question('Choix : ', function (saisie) {
        saisie = saisie.trim();
        switch (saisie) {
            case '1' : {
                findColleguesParNom();
                break;
            }
            case '2' : {
                createCollegue();
                break;
            }
            case '3' :{
                modifierEmail();
                break;
            }
            case '4' : {
                modifierPhotoUrl()
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
            if(colleguesTrouves instanceof Array){
                colleguesTrouves.forEach(function (collegue) {
                    afficherCollegue(collegue);
                });
            }
            else console.log(colleguesTrouves);
            start();
        });
    });
}

function createCollegue() {
    var collegue = {};
        rl.question('nom :', function (nom) {
            collegue.nom = nom;
            rl.question('prenom :', function (prenom) {
                collegue.prenoms = prenom;
                rl.question('email :', function (email) {
                    collegue.email = email;
                    rl.question('date de naissance :', function (dateDeNaissance) {
                        collegue.dateDeNaissance = dateDeNaissance;
                        rl.question('Url de la photo :', function (photoUrl) {
                            collegue.photoUrl = photoUrl;
                            service.creerCollegue(collegue, function (res, body) {
                                console.log(res.statusCode);
                                console.log(body);
                                if(res.statusCode === 201){
                                    start();
                                }
                                else createCollegue();
                            });
                        })
                    })
                })
            })
        })
}
function modifierEmail() {
    var email;
    var nom;
    rl.question('nom :',function (saisie) {
        nom = saisie;
        service.rechercherColleguesParNom(nom, function (colleguesTrouves) {
            if(colleguesTrouves instanceof Array){
                colleguesTrouves.forEach(function (value, index, array) {
                   console.log(index+": "+value.nom+" "+value.prenoms+" "+value.dateDeNaissance)
                });
                rl.question('id :',function (saisie) {
                    var id = saisie;
                    if(id<colleguesTrouves.length){
                        var matricule = colleguesTrouves[id].matricule;
                        rl.question('email :',function (saisie) {
                            email = saisie;
                            service.modifierEmail(matricule,email,function (res,body) {
                                console.log(res.statusCode);
                                console.log(body);
                                start();
                            });
                        })
                    }
                    modifierEmail();
                });
            }
            modifierEmail();
        });

    })
}
function modifierPhotoUrl() {
    var photoUrl;
    var nom;
    rl.question('nom :',function (saisie) {
        nom = saisie;
        service.rechercherColleguesParNom(nom, function (colleguesTrouves) {
            if(colleguesTrouves instanceof Array){
                colleguesTrouves.forEach(function (value, index, array) {
                    console.log(index+": "+value.nom+" "+value.prenoms+" "+value.dateDeNaissance)
                });
                rl.question('id :',function (saisie) {
                    var id = saisie;
                    if(id<colleguesTrouves.length){
                        var matricule = colleguesTrouves[id].matricule;
                        rl.question('photoUrl :',function (saisie) {
                            photoUrl = saisie;
                            service.modifierPhotoUrl(matricule,photoUrl,function (res,body) {
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
function afficherCollegue(collegue){
    console.log(collegue.nom+' '+collegue.prenoms+' '+collegue.email+' ('+collegue.dateDeNaissance+')');
}

exports.start = start;