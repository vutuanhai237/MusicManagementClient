import {
    GENRE_SET_GENRES_ACTION,
    GENRE_SET_CURRENTGENRE_ACTION,
    GENRE_ADD_ACTION,
    GENRE_MODIFY_ACTION,
    GENRE_DELETE_ACTION
} from "../constant/index"

export const initialGenreState = {
    genres: [],
    currentGenre: null,
}

export const GenreReducer = (state, action) => {
    switch (action.type) {
        case GENRE_SET_GENRES_ACTION:
            return {...state, genres: action.payload}
        case GENRE_SET_CURRENTGENRE_ACTION:
            return {...state, currentGenre: action.payload}
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

