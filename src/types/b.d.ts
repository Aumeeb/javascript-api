 

interface IMaterial {
    materialName : string;
    materialCode : string;
    standardDosage : string;
    version : string;
    comments : string;
    operator : JSX.Element;
}
interface INewMaterial {
    materialName : string;
    materialCode : string;
    output : string;
    comments : string;
    operator : JSX.Element;
}
interface ModalDataSet {
    materialNameDropDownLIst? : string[];
    organizationDropDownList? : string[];
    unitDropDownList? :string[];
    amount? : number;

    materialList? : IMaterial[];

    newMaterialList? : INewMaterial[];
}
export declare var ModalDataSet : {
    prototype : ModalDataSet;
    new() : ModalDataSet;
}
