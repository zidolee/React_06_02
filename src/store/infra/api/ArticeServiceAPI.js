
import axios from 'axios';

export function getArticleListAPI() {
    return axios.get('https://us-central1-react-board-60426.cloudfunctions.net/articles')
        //응답 성공
        .then((response) => {
            return response.data
        })
}

export function deleteArticleAPI(id) {
    return Promise.resolve('delete').then(() => {
            return id
    })
}