export class Question {
    answer: string[];
    text:   string;
    type:   string;


    constructor(te :string , ty : string , ans: string[]){
        this.text = te; 
        this.type = ty;
        this.answer = ans;
    }
}













