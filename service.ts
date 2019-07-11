import request from 'request-promise-native';
import {Collegue} from "./domains";

export default class Service {


     rechercherParNom(nomRecherche:string):Promise<Collegue[]> {

        return request(`https://robin-br-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {json: true})
            .then(maticules => Promise.all(maticules.map((value: any) => request(`https://robin-br-collegues-api.herokuapp.com/collegues/${value}`, {json: true}))));

        // retourne une promesse
    }

    creerCollegue(collegue:Collegue) {

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

    modfierEmail(matricule:string,email:string){
        return request(`https://robin-br-collegues-api.herokuapp.com/collegues/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "email": email
            }
        });
    }

    modfierPhotoUrl(matricule:string, photoUrl:string) {
        return request(`https://robin-br-collegues-api.herokuapp.com/collegues/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "photoUrl": photoUrl
            }
        });
    }

}



