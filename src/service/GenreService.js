import {
    HOST, PORT
} from '../constant'
import axios from 'axios';
export const setGenresService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/genres`)
    return result
}


