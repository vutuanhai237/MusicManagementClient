import {
    SINGER_SET_SINGERS_ACTION,
    SINGER_SET_SINGERQUANTITIES_ACTION,
    SINGER_ADD_ACTION,
    SINGER_MODIFY_ACTION,
    SINGER_DELETE_ACTION
} from "../constant/ActionConstant"

export const initialSingerState = {
    singers: [],
    singerQuantities: [],
    statusCode: 0,
};

export const SingerReducer = (state = initialSingerState, action) => {
    switch (action.type) {
        case SINGER_SET_SINGERS_ACTION:
            return {...state, singers: action.payload}
        case SINGER_SET_SINGERQUANTITIES_ACTION:   
            return {...state, singerQuantities: action.payload}
        case SINGER_ADD_ACTION:
            console.log(action.payload)
            return { ...state, statusCode: action.payload }
        case SINGER_MODIFY_ACTION:
            return { ...state, statusCode: action.payload }
        case SINGER_DELETE_ACTION:
            return { ...state, statusCode: action.payload }
        default:
            return state;
    }
}

