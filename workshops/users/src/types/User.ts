export default class User {
    id: number;
    login: string;
    html_url: string;
    avatar_url: string;

    constructor(id: number, login: string, html_url: string, avatar_url: string) {
        this.id = id;
        this.login = login;
        this.html_url = html_url;
        this.avatar_url = avatar_url;
    }
}