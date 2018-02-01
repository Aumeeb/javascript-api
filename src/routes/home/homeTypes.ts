export interface OriginalObject {
    [Prototype: string]: any;
    object: any;
    Prototype: undefined | object;
    OwnPropertyDescriptors : object;
    name?: string;
    readonlys?: string[];
    events?: string[];
    fileds?: string[];
    classes?: string[];
    constants?: string[]
}
export interface JsSysAPI {
    name: string
    key: number;
}
export interface KeywordData {
    name: string
    key: number;
}
export interface IHomeProps {
    suffix?: string;
    
}

export interface IHomeState {
    keywordData:KeywordData[];
    data: JsSysAPI[];
    currentObject?: OriginalObject;
}

 