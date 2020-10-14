import {
    MUSIC_ADD_MUSIC,
    MUSIC_MODIFY_MUSIC,
    MUSIC_DELETE_MUSIC
} from "../constant/index"

const initialState = {
    uploadedImage: null,
    selectedModel: "",
};

function MusicReducer(state = initialState, action) {
    switch (action.type) {
        case MUSIC_ADD_MUSIC:
            return { ...state, music: action.payload.music }
        case MUSIC_MODIFY_MUSIC:
            return { ...state, music: action.payload.music }
        case MUSIC_DELETE_MUSIC:
            return { ...state, music_id: action.payload.music_id }
        default:
            return state;
    }
}

export default MusicReducer;
