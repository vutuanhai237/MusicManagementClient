import {
    MUSICAN_ADD_ACTION,
    MUSICAN_MODIFY_ACTION,
    MUSICAN_DELETE_ACTION
} from "../constant/index"

const initialState = {
    musicans: [],
    currentMusican: null
};

function MusicReducer(state = initialState, action) {
    switch (action.type) {
        case MUSICAN_ADD_ACTION:
            return { ...state, music: action.payload.music }
        case MUSICAN_MODIFY_ACTION:
            return { ...state, music: action.payload.music }
        case MUSICAN_DELETE_ACTION:
            return { ...state, music_id: action.payload.music_id }
        default:
            return state;
    }
}

export default MusicReducer;
