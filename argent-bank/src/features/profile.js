const PROFILE_EDIT = "profile/edit"
const PROFILE_INIT = "profile/init"
const PROFILE_START_EDIT = "profile/startEdit"
const PROFILE_END_EDIT = "profile/endEdit"
const PROFILE_FETCHING = 'profile/fetching'
const PROFILE_RESOLVED = 'profile/resolved'
const PROFILE_REJECTED = 'profile/rejected'

const initState = {
    user:{
        id: null,
        firstName: null,
        lastName: null
    },
    editing: false,
}

export const profileEditAction = (user) => ({ 
    type: PROFILE_EDIT,
    payload: user
})

export const profileInitAction = (user) => ({ 
    type: PROFILE_INIT,
    payload: user
})

export const profileStartEditAction = () => ({ 
    type: PROFILE_START_EDIT
})

export const profileEndEditAction = () => ({ 
    type: PROFILE_END_EDIT
})

export default function profileReducer(state = initState, action){


    if(action.type === PROFILE_START_EDIT){
        return {...state, editing: true}
    }

    if(action.type === PROFILE_END_EDIT){
        return {...state, editing: false}
    }
    
    if(action.type === PROFILE_EDIT){
        return {user: {...state.user, ...action.payload}, editing: false}
    }

    if(action.type === PROFILE_INIT){
        return {...state, user: {...action.payload}}
    }   

    if(action.type === PROFILE_FETCHING){
        switch(state.fetch.status){
            case "void":
                return {...state, fetch:{...state.fetch, status: "pending"}}
            case "resolved":
                return {...state, fetch:{...state.fetch, status: "updating"}}   
            case "rejected":
                return {...state, fetch:{...state.fetch, status: "pending", error: null}}
            default :
                return {...state}
        }
    }

    if(action.type === PROFILE_RESOLVED){
        if(state.fetch.status === "pending" || state.fetch.status === "updating"){
            return {...state, fetch:{...state.fetch, status: "resolved", data: action.payload}}
        }

        return {...state}
    }

    if(action.type === PROFILE_REJECTED){
        if(state.fetch.status === "pending" || state.fetch.status === "updating"){
            return {...state, fetch:{status: "rejected", data: null, error: action.payload}}
        }

        return {...state}
    }

    return state
}