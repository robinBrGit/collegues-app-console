import request from 'request-promise-native';
import {Collegue} from "./domains";

const URI: string = "https://robin-br-collegues-api.herokuapp.com";
const NOM_TEST:string = "Thomas";

export default class Service {

    testService() {
        return request(`${URI}?nom=${NOM_TEST}`, {timeout:10000,json: true});
    }

    rechercherParNom(nomRecherche: string): Promise<Collegue[]> {

        return request(`${URI}?nom=${nomRecherche}`, {json: true})
            .then(maticules => Promise.all(maticules.map((value: any) => request(`${URI}/${value}`, {json: true}))));

        // retourne une promesse
    }

    creerCollegue(collegue: Collegue) {

        return request(`${URI}`, {
            method: 'POST', json: true, body: collegue
        });
    }

    modfierEmail(matricule: string, email: string) {
        return request(`${URI}/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "email": email
            }
        });
    }

    modfierPhotoUrl(matricule: string, photoUrl: string) {
        return request(`${URI}/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "photoUrl": photoUrl
            }
        });
    }

}



