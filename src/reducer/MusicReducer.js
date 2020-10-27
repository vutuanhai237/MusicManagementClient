import {
    MUSIC_SET_MUSICS_ACTION,
    MUSIC_ADD_ACTION,
    MUSIC_MODIFY_ACTION,
    MUSIC_DELETE_ACTION
} from "../constant/ActionConstant"

export const initialMusicState = {
    musics: [],
    statusCode: 0
}

export const MusicReducer = (state = initialMusicState, action) => {
    switch (action.type) {
        case MUSIC_SET_MUSICS_ACTION:
            return {...state, musics: action.payload}
        case MUSIC_ADD_ACTION:
            return { ...state, statusCode: action.payload }
        case MUSIC_MODIFY_ACTION:
            return { ...state, statusCode: action.payload }
        case MUSIC_DELETE_ACTION:
            return { ...state, statusCode: action.payload }
        default:
            return state;
    }
}

