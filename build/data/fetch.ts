
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