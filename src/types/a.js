import b from "./b";
 
var x= new IRecord();

x.content='5'
x.createTime=10;
x.id =[1,2,3];

for (const key in x) {
    if (x.hasOwnProperty(key)) {
        const element = x[key];
        console.log(element)
    }
}