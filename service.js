var request = require('request');


function rechercherColleguesParNom(nomRecherche, callback) {

    request(`https://robin-br-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {json: true}, function (err, res, body) {

        var tableauColleguesTrouves = body;
        var tableauCollegues = Array();
        var i = 0;
        if(tableauColleguesTrouves.length > 0){
            tableauColleguesTrouves.forEach(function (value) {
                request(`https://robin-br-collegues-api.herokuapp.com/collegues/${value}`, {json: true}, function (err, res, body) {
                    tableauCollegues[i]=body;
                    i++;
                    if(tableauColleguesTrouves.length === i)callback(tableauCollegues);
                });
            })
        }
        else {
            request(`https://robin-br-collegues-api.herokuapp.com/collegues/`, {json: true}, function (err, res, body) {
                callback(body);
            });
        }

    });
}

function creerCollegue(collegue,callback){

    request(`https://robin-br-collegues-api.herokuapp.com/collegues`, {method:'POST',json: true,body: {
            "nom" : collegue.nom,
            "prenoms" : collegue.prenoms,
            "email" : collegue.email,
            "dateDeNaissance" : collegue.dateDeNaissance,
            "photoUrl" : collegue.photoUrl
        }}, function (err, res, body) {
        callback(res,body);
    });

}

function modifierEmail(matricule,email,callback){
    request(`https://robin-br-collegues-api.herokuapp.com/collegues/${matricule}`, {method:'PATCH',json: true,body: {
            "email" : email
        }}, function (err, res, body) {
        callback(res,body);
    });
}

function modifierPhotoUrl(matricule,photoUrl,callback){
    request(`https://robin-br-collegues-api.herokuapp.com/collegues/${matricule}`, {method:'PATCH',json: true,body: {
            "photoUrl" : photoUrl
        }}, function (err, res, body) {
        callback(res,body);
    });
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.creerCollegue = creerCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhotoUrl = modifierPhotoUrl;
