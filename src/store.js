import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux'
import rootReducer from './Root';

const middlewares = [logger];
// console.log('sdkfjsdklfjdsklfjdsljflsdkflksdjflksdjlfjds')

// const store = createStore(rootReducer, applyMiddleware(...middlewares));

const configureStore = ({ children, initialState={} }) => {
    const store  = createStore(
        rootReducer, 
        initialState, 
        applyMiddleware(...middlewares)
        )
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}



export default configureStore;