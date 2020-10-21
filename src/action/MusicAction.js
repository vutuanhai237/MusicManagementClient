import {
    MUSIC_SET_ACTION,
    MUSIC_ADD_ACTION,
    MUSIC_MODIFY_ACTION,
    MUSIC_DELETE_ACTION
} from "../constant/index.js"


export const setMusicsAction = (musics) => {
    return {
        type: MUSIC_SET_ACTION,
        payload: musics
    }
}

export const addMusicAction = (music) => {
    return {
        type: MUSIC_ADD_ACTION,
        payload: music
    }
}