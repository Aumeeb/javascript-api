export class Http {
    static get(path: string): Promise<Response> {
        return fetch(path)
    }
}

export  class DataUrl {
    static readonly getJsSysAPI = './data/js.json';
}