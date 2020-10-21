import {
    HOST, PORT
} from '../constant'
import axios from 'axios';

export const setMusicsService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/musics`)
    return result
}


