import {
    GENRE_SET_GENRES_ACTION,
    GENRE_ADD_ACTION,
    GENRE_MODIFY_ACTION,
    GENRE_DELETE_ACTION
} from "../constant/actionConstant"

export const initialGenreState = {
    genres: [],
    statusCode: 0,
}

export const GenreReducer = (state, action) => {
    switch (action.type) {
        case GENRE_SET_GENRES_ACTION:
            return {...state, genres: action.payload}
        case GENRE_ADD_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        case GENRE_MODIFY_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        case GENRE_DELETE_ACTION:
            return { ...state, statusCode: action.payload.statusCode }
        default:
            return state;
    }
}

