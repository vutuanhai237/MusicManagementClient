import {
    MUSICIAN_SET_MUSICIANS_ACTION,
    MUSICIAN_SET_CURRENTMUSICIAN_ACTION,
    MUSICIAN_ADD_ACTION,
    MUSICIAN_MODIFY_ACTION,
    MUSICIAN_DELETE_ACTION
} from "../constant/actionConstant"

export const initialMusicianState = {
    musicians: [],
    statusCode: 0,
};

export const MusicianReducer = (state, action) => {
    switch (action.type) {
        case MUSICIAN_SET_MUSICIANS_ACTION:
            return {...state, musicians: action.payload}
        // case MUSICIAN_ADD_ACTION:
        //     return { ...state, music: action.payload.music }
        // case MUSICIAN_MODIFY_ACTION:
        //     return { ...state, music: action.payload.music }
        // case MUSICIAN_DELETE_ACTION:
        //     return { ...state, music_id: action.payload.music_id }
        default:
            return state;
    }
}

