import readline from 'readline';


export default class Readline {
    private _rl:any;
    constructor(){
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    question(saisie:string):Promise<string>{
        let rl = this._rl;
        return new Promise((resolve)=>{
            rl.question(saisie, (reponse:string)=> resolve(reponse));
        })
    }

    close(){
        this._rl.close();
    }
}

