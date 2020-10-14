import {
    MUSIC_GET_ACTION,
    MUSIC_ADD_ACTION,
    MUSIC_MODIFY_ACTION,
    MUSIC_DELETE_ACTION
} from "../constant/index"

const initialState = {
    musics: [],
    currentMusic: null,
    statusCode: "",
};

function MusicReducer(state = initialState, action) {
    switch (action.type) {
        case MUSIC_GET_ACTION:
            return { ...state, music: action.payload.music, statusCode: action.payload.statusCode }
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

export default MusicReducer;
