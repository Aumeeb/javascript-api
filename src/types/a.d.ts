declare namespace TS {
    let id: number;
    let createTime: number;
    let  content: string;
 
 
}

 interface IRecord{
    id?: number[]
    createTime?: number;
    content?: string;
    
}
declare var IRecord:{
    prototype:IRecord;
    new():IRecord;
    
}

