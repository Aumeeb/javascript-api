
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



export async function takeX<T1, T2>(path: string, path2: string){
    // export async function takeX<T1,T2,T3>(...paths: string[]): Promise<{first:T1,second:T2}>
    // export async function takeX<T1,T2,T3,T4>(...paths: string[]): Promise<{first:T1,second:T2}>
    // export async function takeX<T1,T2,T3,T4,T5>(...paths: string[]): Promise<{first:T1,second:T2}>{
    // type ResultT2 = { first: Promise<T1>, second: Promise<T2> }
 
    var response1 = await fetch(path);
    var t1 = await response1.json() as T1;
   
    var response2 = await fetch(path2);
    var t2 = await response2.json() as T2;   
 
    return {first:t1,second:t2}
    // return new Promise<T1 & T2>((resovle) => {
    //     var fail = {} as T1 & T2
    //     resovle(Object.assign(t1Data, t2Data));
    // });

}




