import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
const initialState = {

}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let configureStore;

if (process.env.NODE_ENV === 'production') {
  configureStore = () => {
    return createStore(reducers, initialState, applyMiddleware(thunk))
  }
} else {
  configureStore = () => {
    return createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)))
  }
}

export default configureStore;
