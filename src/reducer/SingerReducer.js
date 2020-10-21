import {
    SINGER_SET_SINGERS_ACTION,
    SINGER_SET_CURRENTSINGER_ACTION,
    SINGER_ADD_ACTION,
    SINGER_MODIFY_ACTION,
    SINGER_DELETE_ACTION
} from "../constant/index"

export const initialSingerState = {
    singers: [],
    currentSinger: null,
}

export const SingerReducer = (state, action) => {
    switch (action.type) {
        case SINGER_SET_SINGERS_ACTION:
            return {...state, singers: action.payload}
        case SINGER_SET_CURRENTSINGER_ACTION:
            return {...state, currentSinger: action.payload}
        case SINGER_ADD_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        case SINGER_MODIFY_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        case SINGER_DELETE_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        default:
            return state;
    }
}

