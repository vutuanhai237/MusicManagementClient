import {
    GENRE_SET_GENRES_ACTION,
    GENRE_SET_GENREQUANTITIES_ACTION,
    GENRE_ADD_ACTION,
    GENRE_MODIFY_ACTION,
    GENRE_DELETE_ACTION
} from "../constant/ActionConstant"

export const initialGenreState = {
    genres: [],
    genreQuantities: [],
    statusCode: 0,
}

export const GenreReducer = (state = initialGenreState, action) => {
    switch (action.type) {
        case GENRE_SET_GENRES_ACTION:
            return {...state, genres: action.payload}
        case GENRE_SET_GENREQUANTITIES_ACTION:
            return {...state, genreQuantities: action.payload}
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

