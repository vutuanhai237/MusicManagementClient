import {

    SINGER_SET_SINGERS_ACTION,
    SINGER_SET_CURRENTSINGER_ACTION,
    SINGER_ADD_ACTION,
    SINGER_MODIFY_ACTION,
    SINGER_DELETE_ACTION
} from "../constant/actionConstant.js"


export const setSingersAction = (singers) => {
    return {
        type: SINGER_SET_SINGERS_ACTION,
        payload: singers
    }
}

export const setCurrentSingerAction = (singerName) => {
    return {
        type: SINGER_SET_CURRENTSINGER_ACTION,
        payload: singerName
    }
}