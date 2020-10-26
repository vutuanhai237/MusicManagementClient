import {
    HOST, PORT
} from '../constant'
import axios from 'axios';
export const setMusiciansService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/musicians`)
    return result
}


