 export function get(path: string): Promise<Response> {
    return fetch(path)
}