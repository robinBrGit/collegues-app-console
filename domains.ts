export class Collegue {
    public matricule?:string;
    constructor(public nom:string,
                public prenoms:string,
                public email:string,
                public dateDeNaissance:string,
                public photoUrl:string) {
    }
}
/*
export interface TsCollegue {
    nom?:string;
    prenoms?:string;
    email?:string;
    dateDeNaissance?:string;
    photoUrl?:string;
}

*/