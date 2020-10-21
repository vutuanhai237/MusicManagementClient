import {
    MUSIC_SET_ACTION,
    MUSIC_ADD_ACTION,
    MUSIC_MODIFY_ACTION,
    MUSIC_DELETE_ACTION
} from "../constant/index"

export const initialMusicState = {
    musics: [],
    currentMusic: null,
    statusCode: "",
};

export const MusicReducer = (state, action) => {
    switch (action.type) {
        case MUSIC_SET_ACTION:
            console.log(action)
            return { ...state, musics: action.payload }
        case MUSIC_ADD_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        case MUSIC_MODIFY_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        case MUSIC_DELETE_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        default:
            return state;
    }
}


