import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import articleListReducer from './articleListReducer'

//store를 생성하는 함수를 정의

export function configureStore() {

    // applyMiddleware(thunk,...);
    const middleware = applyMiddleware(thunk);
    // 리덕스 Devtools 쓰려면 compose()안에 넣어서
    // 없을 경우 middolware만 
    const composed = window.__REDUX_DEVTOOLS_EXTENSION__ ?
        compose(
            middleware,
            window.__REDUX_DEVTOOLS_EXTENSION__()   
        ) :
        middleware
    return createStore(combineReducers({
        articleList: articleListReducer,

    }), composed);  //createStore(reducer, middleware)
}