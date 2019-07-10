const readline = require('readline');


class Readline {
    constructor(){
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    question(saisie){
        let rl = this.rl;
        return new Promise((resolve,reject)=>{
            rl.question(saisie, reponse => resolve(reponse));
        })
    }

    close(){
        this.rl.close();
    }
}

exports.Readline = Readline;