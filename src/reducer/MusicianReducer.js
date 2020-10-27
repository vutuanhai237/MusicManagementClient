import {
    MUSICIAN_SET_MUSICIANS_ACTION,
    MUSICIAN_SET_MUSICIANQUANTITIES_ACTION,
    MUSICIAN_ADD_ACTION,
    MUSICIAN_MODIFY_ACTION,
    MUSICIAN_DELETE_ACTION
} from "../constant/ActionConstant"

export const initialMusicianState = {
    musicians: [],
    musicianQuantities: [],
    statusCode: 0,
};

export const MusicianReducer = (state = initialMusicianState, action) => {
    switch (action.type) {
        case MUSICIAN_SET_MUSICIANS_ACTION:
            return {...state, musicians: action.payload}
        case MUSICIAN_SET_MUSICIANQUANTITIES_ACTION:   
            return {...state, musicianQuantities: action.payload}
        case MUSICIAN_ADD_ACTION:
            console.log(action.payload)
            return { ...state, statusCode: action.payload.statusCode }
        case MUSICIAN_MODIFY_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        case MUSICIAN_DELETE_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        default:
            return state;
    }
}

