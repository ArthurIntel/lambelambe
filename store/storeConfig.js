import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import userReducer from './reducers/user'//Como é exportado Default, não tem problema alterar o nome 'userReducer'
import postsReducer from './reducers/posts'
import messageReducer from './reducers/message'
import thunk from 'redux-thunk'

const reducers = combineReducers({ //Estado global da aplicação
    user: userReducer,
    posts: postsReducer,
    message: messageReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig