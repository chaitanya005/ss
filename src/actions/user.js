import { ADD_USER } from './types'

export function addUser(user) {
    console.log(user)
    return  {
        type: ADD_USER,
        payload: user
    }
}