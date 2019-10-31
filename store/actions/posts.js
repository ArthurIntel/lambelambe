import { SET_POSTS, ADD_COMMENT, CREATED_POST, CREATING_POST } from './actionTypes'
import axios from 'axios'
import { setMessage } from './message'

export const addPost = post => {
    return dispatch => {
        dispatch(creatingPost())
        axios({//https://us-central1-lambelambe-7d726.cloudfunctions.net/uploadImage
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambelambe-7d726.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Sucesso!',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(resp => {  
                post.image = resp.data.imageUrl
                axios.post('/posts.json', { ...post })
                    .catch(err => {console.log(err)})
                    .then(res => {
                        dispatch(getPosts())
                        dispatch(createdPost())
                        dispatch(setMessage({
                            title: 'Sucesso!',
                            text: 'Nova postagem'
                        }))
                    })
            })
    }
}

export const addComment = payload => {
    return dispatch => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Sucesso!',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json`, { comments })
                    .catch(err => {console.log(err)})
                    .then(res => {
                        dispatch(getPosts())
                    })
            })
    }

    // return {
    //     type: ADD_COMMENT,
    //     payload: payload
    // }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const getPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {console.log(err)})
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const createdPost = () => {
    return {
        type: CREATED_POST
    }
}