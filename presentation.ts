import Readline from './util';
import Service from "./service";
import {Collegue} from "./domains";



export default class Presentation {
    private _service:Service;
    private _rl:Readline;
    constructor() {
        this._service = new Service();
        this._rl = new Readline();
    }

    start(): void {
        console.log(`1. Rechercher un collègue par nom
2. Créer un collègue par nom
3. Modfier email
4. Modfier photoUrl
99. Sortir`);
        this._rl.question('Choix :').then((saisie:string) => {
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
                    this.modifierPhotoUrl();
                    break;
                }
                case '99' : {
                    this._rl.close();
                    break;
                }
            }
        });
    }

    findColleguesParNom(): void {
        this._rl.question('nom :').then((saisie:string)=>{
            return this._service.rechercherParNom(saisie);
        }).then(collegues=>{
            collegues.forEach((collegue:Collegue) => {
                Presentation.afficherCollegue(collegue);
            });
            this.start();
        }).catch(err => console.log(err));
    }

    createCollegue(): void {
        let paramsSaisie:any ={};
        this._rl.question('nom :').then(nom=>{
            paramsSaisie.nom = nom;
            return this._rl.question('prenom :');
        }).then(prenom=>{
            paramsSaisie.prenoms = prenom;
            return this._rl.question('email :');
        }).then(email=>{
            paramsSaisie.email = email;
            return this._rl.question('date de naissance :')
        }).then(dateDeNaissance=>{
            paramsSaisie.dateDeNaissance = dateDeNaissance;
            return this._rl.question('Url de la photo :')
        }).then(photoUrl=>{
            paramsSaisie.photoUrl = photoUrl;
            let collegue = new Collegue(paramsSaisie.nom,paramsSaisie.prenoms,paramsSaisie.email,paramsSaisie.dateDeNaissance,paramsSaisie.photoUrl);
            return this._service.creerCollegue(collegue);
        }).then(body=>{
            console.log(body);
            this.start();
        }).catch(err => {
            console.log(err);
            this.createCollegue();
        });
    }

    modifierEmail(): void {
        let matricule:any;
        let listCollegues:Collegue[] = [];
        this._rl.question('nom :').then((nom:string)=>{
            return this._service.rechercherParNom(nom);
        }).then((collegues)=>{
            listCollegues = collegues;
            collegues.forEach(function (value:Collegue, index:number) {
                console.log(`${index}: ${value.nom} ${value.prenoms} ${value.dateDeNaissance}`);
            });
            return this._rl.question('id :');
        }).then((id:string)=>{
            let idParsed:number = Number.parseInt(id);
            if(idParsed<listCollegues.length){
                matricule = listCollegues[idParsed].matricule;
            }
            return this._rl.question('email :');
        }).then((email:string)=>{
            return this._service.modfierEmail(matricule,email);
        }).then(body => {
            console.log(body);
            this.start();
        }).catch(err=>{
            console.log(err.message);
            this.modifierEmail();
        })
    }

    modifierPhotoUrl(): void {
        let matricule:any;
        let listCollegues:Collegue[] = [];
        this._rl.question('nom :').then((nom:string)=>{
            return this._service.rechercherParNom(nom);
        }).then(collegues=>{
            listCollegues = collegues;
            collegues.forEach(function (value:Collegue, index:number) {
                console.log(`${index}: ${value.nom} ${value.prenoms} ${value.dateDeNaissance}`);
            });
            return this._rl.question('id :');
        }).then((id:string)=>{
            let idParsed:number = Number.parseInt(id);
            if(idParsed < listCollegues.length){
                matricule = listCollegues[idParsed].matricule;
            }
            return this._rl.question('photo url :');
        }).then((photoUrl:string)=>{
            return this._service.modfierPhotoUrl(matricule,photoUrl);
        }).then(body => {
            console.log(body);
            this.start();
        }).catch(err=>{
            console.log(err.message);
            this.modifierPhotoUrl();
        })
    }

    static afficherCollegue(collegue:Collegue): void {
        console.log(`${collegue.nom} ${collegue.prenoms} ${collegue.email} (${collegue.dateDeNaissance})`);
    }

}

