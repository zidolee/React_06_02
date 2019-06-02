import axios from 'axios';
const GET_ARTICLE_LIST_REQUEST = 'GET_ARTICLE_LIST_REQUEST';
const GET_ARTICLE_LIST_SUCCESS = 'GET_ARTICLE_LIST_SUCCESS';
const GET_ARTICLE_LIST_FAILED = 'GET_ARTICLE_LIST_FAILED';

function getArticleListRequest() {
    return {
        type: GET_ARTICLE_LIST_REQUEST,
        payload : null
    }
}

function getArticleListSuccess(data) {
    return {
        type: GET_ARTICLE_LIST_SUCCESS,
        payload : {
            data: data
        }
    }
}

function getArticleListFailed(error) {
    return {
        type: GET_ARTICLE_LIST_FAILED,
        payload : {
            error :error
        }
    }
}

export function getArticleList() {
    return (dispatch) => {
        dispatch(getArticleListRequest())
        axios.get('https://us-central1-react-board-60426.cloudfunctions.net/articles')
        //응답 성공
        .then((response) => {
            return response.data
        }).then((data) => {
            dispatch(getArticleListSuccess(data))
        }).catch((error) => {
            console.log(error)
            dispatch(getArticleListFailed(new Error('get article list failed')))
        })
    }
}

//delete
const DELETE_ARTICLE_LIST_REQUEST = 'DELETE_ARTICLE_LIST_REQUEST';
const DELETE_ARTICLE_LIST_SUCCESS = 'DELETE_ARTICLE_LIST_SUCCESS';
const DELETE_ARTICLE_LIST_FAILED = 'DELETE_ARTICLE_LIST_FAILED';

function deleteArticleListRequest() {
    return {
        type: DELETE_ARTICLE_LIST_REQUEST,
        payload : null
    }
}

function deleteArticleListSuccess(deleteId) {
    return {
        type: DELETE_ARTICLE_LIST_SUCCESS,
        payload : {
            deleteId: deleteId
        }
    }
}

function deleteArticleListFailed(error) {
    return {
        type: DELETE_ARTICLE_LIST_FAILED,
        payload : {
            error :error
        }
    }
}

export function deleteArticle(id) {
    return (dispatch) => {
        dispatch(deleteArticleListRequest())
        Promise.resolve('delete')
        //응답 성공
        .then((result) => {
            // result === 'delete'
            return   dispatch(deleteArticleListSuccess(id))
        }).catch((error) => {
            dispatch(deleteArticleListFailed(new Error('delete article list failed')))
        })
    }
}
//update

//add


export default function articleListReducer(state = {
    isLoading: false,
    isSuccess : false,
    isFailed :false,
    list: [],
    error: null,
}, {type, payload}) {
    switch(type){
        case GET_ARTICLE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess : false,
                isFailed :false,
            })
        case GET_ARTICLE_LIST_SUCCESS:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess : true,
                    isFailed :false,
                    list: [...payload.data]
                })
        case GET_ARTICLE_LIST_FAILED:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess : false,
                    isFailed :true,
                    error: payload.error
                })
        case DELETE_ARTICLE_LIST_REQUEST:
                return Object.assign({}, state, {
                    isLoading: true,
                    isSuccess : false,
                    isFailed :false,
                })
        case DELETE_ARTICLE_LIST_SUCCESS:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess : true,
                    isFailed :false,
                    list: [...payload.data]
                })
        case DELETE_ARTICLE_LIST_FAILED:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess : false,
                    isFailed :true,
                    error: payload.error
                })
        default:
            return state;
    }
}