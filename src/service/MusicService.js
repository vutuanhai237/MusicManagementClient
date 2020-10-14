import {
    HOST, PORT
} from '../constant'
import {
    getMusic, 
    postMusic, 
    deleteMusic, 
} from '../action/MusicAction';
export const getMusicAPI = (image) => {
    return dispatch => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`http://${HOST}:${PORT}/musics`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
        // dispatch(getMusic(image));
    }
}


