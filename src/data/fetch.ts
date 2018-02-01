
export async function take<T>(path: string): Promise<T> {
    try {
        var response = await fetch(path);
        return await response.json() as Promise<T>
    } catch (e) {
        return new Promise<T>((resovle) => {
            var fail = {} as T;
            console.log('调用接口失败')
            console.log(e)
            resovle(fail);
        });
    }
}


export class DataUrl {
    static readonly JsSysAPIAddress = './data/JsSysAPI.json';
    static readonly keywordsAddress = './data/JsKeyWords.json';
    static readonly weatcherAddress = './data/weatcher.json';
    static readonly articleAddress = './data/article.json';
}


export async function infiniteTake<T1>(path: string): Promise<{ first: T1 }>;
export async function infiniteTake<T1, T2>(path: string, path2?: string): Promise<{ first: T1, second: T2 }>;
export async function infiniteTake<T1, T2, T3>(path: string, path2?: string, path3?: string): Promise<{ first: T1, second: T2, third: T3 }>
export async function infiniteTake<T1, T2, T3, T4>(path: string, path2?: string, path3?: string, path4?: string): Promise<{ first: T1, second: T2, third: T3, forth: T4 }>
export async function infiniteTake<T1, T2, T3, T4, T5>(path: string, path2?: string, path3?: string, path4?: string) {
    var response1, response2, response3, response4;
    var t1, t2, t3, t4;
    if (path4 && path3 && path2) {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        response2 = await fetch(path2);
        t2 = await response2.json() as T2;
        response3 = await fetch(path3);
        t3 = await response3.json() as T3;
        response4 = await fetch(path4);
        t4 = await response4.json() as T4;
        return { first: t1, second: t2, third: t3, forth: t4 }
    } else if (path3 && path2) {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        response2 = await fetch(path2);
        t2 = await response2.json() as T2;
        response3 = await fetch(path3);
        t3 = await response3.json() as T3;
        return { first: t1, second: t2, third: t3 }
    }
    else if (path2) {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        response2 = await fetch(path2);
        t2 = await response2.json() as T2;
        return { first: t1, second: t2 }
    } else {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        return { first: t1, second: t2 }
    }
}
