export class Review {
    nick: string;
    name: string;
    text: string;
    date?: string;


    constructor(nick: string, name: string, text: string, date: string) {

        this.nick = nick;
        this.name = name;
        this.text = text;
        this.date = date;
    }
}