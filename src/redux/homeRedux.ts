import { JsSysAPI } from "../routes/home/homeTypes";
import { AnyAction } from "redux";
import { infiniteTake, DataUrl, take } from "../data/fetch";
 
export type FetchAction<T> = { type: any, data: Promise<T> };

export type HomeActionType = "getSysAPIName" | "getSysKeywordName" | "getNewFeaturesName" | undefined;

export class HomeAction implements AnyAction {
    [extraProps: string]: any;
    type: HomeActionType;

    static getSysAPIName<T>(): FetchAction<T> {
        return {
            type: 'getSysAPIName',
            data: take<T>(DataUrl.JsSysAPIAddress)
        }
    }
    static getSysKeywordName<T>(): FetchAction<T> {
        return {
            type: 'getSysKeywordName',
            data: take<T>(DataUrl.keywordsAddress)
        }
    }
}





export  function homeReducer(state = 1, actionType: HomeAction) {
    switch (actionType.type) {
        case 'getSysAPIName':
            return state;
        case 'getSysKeywordName':
            return state;
        default:
            return state
    }
}