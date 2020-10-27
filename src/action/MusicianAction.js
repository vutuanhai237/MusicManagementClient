import {

    MUSICIAN_SET_MUSICIANS_ACTION,
    MUSICIAN_SET_MUSICIANQUANTITIES_ACTION,
    MUSICIAN_ADD_ACTION,
    MUSICIAN_DELETE_ACTION,
    MUSICIAN_MODIFY_ACTION
} from "../constant/ActionConstant.js"


export const setMusiciansAction = (musicians) => {
    return {
        type: MUSICIAN_SET_MUSICIANS_ACTION,
        payload: musicians
    }
}

export const setMusicianQuantitiesAction = (musicianQuantities) => {
    return {
        type: MUSICIAN_SET_MUSICIANQUANTITIES_ACTION,
        payload: musicianQuantities
    }
}

export const modifyMusicianAction = (statusCode) => {
    return {
        type: MUSICIAN_MODIFY_ACTION,
        payload: statusCode
    }
}

export const addMusicianAction = (musician) => {
    return {
        type: MUSICIAN_ADD_ACTION,
        payload: musician
    }
}

export const deleteMusicianAction = (id) => {
    return {
        type: MUSICIAN_DELETE_ACTION,
        payload: id
    }
}
