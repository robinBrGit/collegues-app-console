import baseRequest from 'request-promise-native';
import {Collegue} from "./domains";

//const URI: string = "https://robin-br-collegues-api.herokuapp.com";
const URI: string = "http://localhost:8080";
const NOM_TEST:string = "Thomas";
const request = baseRequest.defaults({
    jar:true

});

export default class Service {

    auth(email:string,mdp:string){
        return request(`${URI}/auth`,{
            method: 'POST',json: true, body: {
                'email':email,
                'motDePasse':mdp
            }
        })
    }

    testService() {
        return request(`${URI}/collegues?nom=${NOM_TEST}`, {timeout:10000,json: true});
    }

    rechercherParNom(nomRecherche: string): Promise<Collegue[]> {

        return request(`${URI}/collegues?nom=${nomRecherche}`, {json: true})
            .then(maticules => Promise.all(maticules.map((value: any) => request(`${URI}/collegues/${value}`, {json: true}))));

        // retourne une promesse
    }

    creerCollegue(collegue: Collegue) {

        return request(`${URI}/collegues`, {
            method: 'POST', json: true, body: collegue
        });
    }

    modfierEmail(matricule: string, email: string) {
        return request(`${URI}/collegues/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "email": email
            }
        });
    }

    modfierPhotoUrl(matricule: string, photoUrl: string) {
        return request(`${URI}/collegues/${matricule}`, {
            method: 'PATCH', json: true, body: {
                "photoUrl": photoUrl
            }
        });
    }

    logout(){
        return request(`${URI}/logout`,{
            method: 'POST'
        })
    }

}



