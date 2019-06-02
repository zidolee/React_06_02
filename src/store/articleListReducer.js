import axios from 'axios';
import {createAction, handleActions} from 'redux-actions'
const GET_ARTICLE_LIST_REQUEST = 'GET_ARTICLE_LIST_REQUEST';
const GET_ARTICLE_LIST_SUCCESS = 'GET_ARTICLE_LIST_SUCCESS';
const GET_ARTICLE_LIST_FAILED = 'GET_ARTICLE_LIST_FAILED';

const getArticleListRequest = createAction(GET_ARTICLE_LIST_REQUEST);
// function getArticleListRequest() {
//     return {
//         type: GET_ARTICLE_LIST_REQUEST,
//         payload : null
//     }
// }

const getArticleListSuccess = createAction(GET_ARTICLE_LIST_SUCCESS);
// 썜은 전자가 나은것 같음
// const getArticleListSuccess = createAction(GET_ARTICLE_LIST_SUCCESS, (data) => {
//     return {
//         data: data
//     }
// });

// function getArticleListSuccess(data) {
//     return {
//         type: GET_ARTICLE_LIST_SUCCESS,
//         payload : {
//             data: data
//         }
//     }
// }
const getArticleListFailed = createAction(GET_ARTICLE_LIST_FAILED);
// const getArticleListFailed = createAction(GET_ARTICLE_LIST_FAILED, (error) => {
//     return {
//         error : error
//     }
// });
// function getArticleListFailed(error) {
//     return {
//         type: GET_ARTICLE_LIST_FAILED,
//         payload : {
//             error :error
//         }
//     }
// }

export function getArticleList() {
    return (dispatch) => {
        dispatch(getArticleListRequest())
        axios.get('https://us-central1-react-board-60426.cloudfunctions.net/articles')
        //응답 성공
        .then((response) => {
            return response.data
        }).then((data) => {
            dispatch(getArticleListSuccess({data:data}))
        }).catch((error) => {
            console.log(error)
            dispatch(getArticleListFailed({error :new Error('get article list failed')}))
        })
    }
}

//delete
const DELETE_ARTICLE_LIST_REQUEST = 'DELETE_ARTICLE_LIST_REQUEST';
const DELETE_ARTICLE_LIST_SUCCESS = 'DELETE_ARTICLE_LIST_SUCCESS';
const DELETE_ARTICLE_LIST_FAILED = 'DELETE_ARTICLE_LIST_FAILED';

const deleteArticleListRequest = createAction(DELETE_ARTICLE_LIST_REQUEST);
// function deleteArticleListRequest() {
//     return {
//         type: DELETE_ARTICLE_LIST_REQUEST,
//         payload : null
//     }
// }

const deleteArticleListSuccess = createAction(DELETE_ARTICLE_LIST_SUCCESS);
// function deleteArticleListSuccess(deleteId) {
//     return {
//         type: DELETE_ARTICLE_LIST_SUCCESS,
//         payload : {
//             deleteId: deleteId
//         }
//     }
// }

const deleteArticleListFailed = createAction(DELETE_ARTICLE_LIST_FAILED);
// function deleteArticleListFailed(error) {
//     return {
//         type: DELETE_ARTICLE_LIST_FAILED,
//         payload : {
//             error :error
//         }
//     }
// }

export function deleteArticle(id) {
    return (dispatch) => {
        dispatch(deleteArticleListRequest())
        Promise.resolve('delete')
        //응답 성공
        .then((result) => {
            // result === 'delete'
            return   dispatch(deleteArticleListSuccess({id:id}))
        }).catch((error) => {
            dispatch(deleteArticleListFailed({error :new Error('get article list failed')}))
        })
    }
}
//update

//add

const initialState = {
    isLoading: false,
    isSuccess : false,
    isFailed :false,
    list: [],
    error: null
}

export default handleActions({
    GET_ARTICLE_LIST_REQUEST : (state, {payload}) => {
        return Object.assign({}, state, {
                isLoading: true,
                isSuccess : false,
                isFailed :false,
            })
    },GET_ARTICLE_LIST_SUCCESS : (state, {payload}) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess : true,
            isFailed :false,
            list: [...payload.data]
        })
    },GET_ARTICLE_LIST_FAILED : (state, {payload}) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess : false,
            isFailed :true,
            error: payload.error
        })
    },DELETE_ARTICLE_LIST_REQUEST : (state, {payload}) => {
        return Object.assign({}, state, {
            isLoading: true,
            isSuccess : false,
            isFailed :false,
        })
    },DELETE_ARTICLE_LIST_SUCCESS : (state, {payload}) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess : true,
            isFailed :false,
            list: [...payload.data]
        })
    },DELETE_ARTICLE_LIST_FAILED : (state, {payload}) => {
        return Object.assign({}, state, {
            isLoading: false,
            isSuccess : false,
            isFailed :true,
            error: payload.error
        })
    }
}, initialState)

// export default function articleListReducer(state = {
//     isLoading: false,
//     isSuccess : false,
//     isFailed :false,
//     list: [],
//     error: null,
// }, {type, payload}) {
//     switch(type){
//         case GET_ARTICLE_LIST_REQUEST:
//             return Object.assign({}, state, {
//                 isLoading: true,
//                 isSuccess : false,
//                 isFailed :false,
//             })
//         case GET_ARTICLE_LIST_SUCCESS:
//                 return Object.assign({}, state, {
//                     isLoading: false,
//                     isSuccess : true,
//                     isFailed :false,
//                     list: [...payload.data]
//                 })
//         case GET_ARTICLE_LIST_FAILED:
//                 return Object.assign({}, state, {
//                     isLoading: false,
//                     isSuccess : false,
//                     isFailed :true,
//                     error: payload.error
//                 })
//         case DELETE_ARTICLE_LIST_REQUEST:
//                 return Object.assign({}, state, {
//                     isLoading: true,
//                     isSuccess : false,
//                     isFailed :false,
//                 })
//         case DELETE_ARTICLE_LIST_SUCCESS:
//                 return Object.assign({}, state, {
//                     isLoading: false,
//                     isSuccess : true,
//                     isFailed :false,
//                     list: [...payload.data]
//                 })
//         case DELETE_ARTICLE_LIST_FAILED:
//                 return Object.assign({}, state, {
//                     isLoading: false,
//                     isSuccess : false,
//                     isFailed :true,
//                     error: payload.error
//                 })
//         default:
//             return state;
//     }
// }