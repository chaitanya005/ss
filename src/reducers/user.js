const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    console.log(action.type)
    switch(action.type) {
        case 'ADD_USER':
            return {
                ...state,
                currentUser: action.payload   
            }
        default:
            return state;
    }
}

export default userReducer;