
export async function get<T>(path: string): Promise<T> {
    var response = await fetch(path);
    return await response.json() as Promise<T>

}






export class DataUrl {
    static readonly JsSysAPIAddress = './data/JsSysAPI.json';
    static readonly weatcherAddress = './data/weatcher.json';
}