var request = require('request-promise-native');

class Service {


     rechercherParNom(nomRecherche) {

        return request(`https://robin-br-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {json: true})
            .then(maticules => Promise.all(maticules.map(value => request(`https://robin-br-collegues-api.herokuapp.com/collegues/${value}`, {json: true}))));

        // retourne une promesse
    }

    creerCollegue(collegue) {

        return request(`https://robin-br-collegues-api.herokuapp.com/collegues`, {
            method: 'POST', json: true, body: {
                "nom": collegue.nom,
                "prenoms": collegue.prenoms,
                "email": collegue.email,
                "dateDeNaissance": collegue.dateDeNaissance,
                "photoUrl": collegue.photoUrl
            }
        });
    }

    modfierEmail(matricule,email){
        return request(`https://robin-br-collegues-api.herokuapp.com/collegues/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "email": email
            }
        });
    }

    modfierPhotoUrl(matricule, photoUrl) {
        return request(`https://robin-br-collegues-api.herokuapp.com/collegues/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "photoUrl": photoUrl
            }
        });
    }

}

exports.Service = Service;

