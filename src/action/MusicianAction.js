import {

    MUSICIAN_SET_MUSICIANS_ACTION,
    MUSICIAN_SET_CURRENTMUSICIAN_ACTION,
    MUSICIAN_ADD_ACTION,
    MUSICIAN_MODIFY_ACTION,
    MUSICIAN_DELETE_ACTION
} from "../constant/actionConstant.js"


export const setMusiciansAction = (musicians) => {
    return {
        type: MUSICIAN_SET_MUSICIANS_ACTION,
        payload: musicians
    }
}

export const setCurrentMusicianAction = (musicianName) => {
    return {
        type: MUSICIAN_SET_CURRENTMUSICIAN_ACTION,
        payload: musicianName
    }
}