var request = require('request');


function rechercherColleguesParNom(nomRecherche, callback) {

    request(`https://robin-br-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {json: true}, function (err, res, body) {

        var tableauColleguesTrouves = body;
        var tableauCollegues = Array();
        var i = 0;
        tableauColleguesTrouves.forEach(function (value) {
            request(`https://robin-br-collegues-api.herokuapp.com/collegues/${value}`, {json: true}, function (err, res, body) {
                    tableauCollegues[i]=body;
                    i++;
                    if(tableauColleguesTrouves.length === i)callback(tableauCollegues);
            });
        })

    });
}

function creerCollegue(nom,prenoms,email,dateDeNaissance,photoUrl,callback){

    request(`https://robin-br-collegues-api.herokuapp.com/collegues`, {method:'POST',json: true,body: {
            "nom" : nom,
            "prenoms" : prenoms,
            "email" : email,
            "dateDeNaissance" : dateDeNaissance,
            "photoUrl" : photoUrl
        }}, function (err, res, body) {
        callback(res,body);
    });

}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
