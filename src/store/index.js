import { createStore, compose, applyMiddleware } from "redux";
import RootReducer from "../reducer/"
import thunk from 'redux-thunk';



const store = createStore(
    RootReducer,
    compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f)
);
store.subscribe(() => {})


export default store;