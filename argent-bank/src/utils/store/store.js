import { createStore, combineReducers } from "redux"
import profileReducer from "../../features/profile"
import connexionReducer from "../../features/connexion"

const FETCHING = "fetching"
const RESOLVED = "resolved"
const REJECTED = "rejected"

export const fetchingAction = () => ({ 
    type: FETCHING 
})

export const resolvedAction = (data) => ({
    type: RESOLVED, 
    payload: data 
})

export const rejectedAction = (error) => ({
    type: REJECTED, 
    payload: error 
})

function fetchingReducer(state = {status: "void", data: null, error: null},action){

    if(action.type === FETCHING){
        switch(state.status){
            case "void":
                return {...state, status: "pending"}
            case "resolved":
                return {...state, status: "updating"}   
            case "rejected":
                return {...state, status: "pending", error: null}
            default :
                return {...state}
        }
    }

    if(action.type === RESOLVED){
        if(state.status === "pending" || state.status === "updating"){
            return {...state, status: "resolved", data: action.payload}
        }

        return {...state}
    }

    if(action.type === REJECTED){
        if(state.status === "pending" || state.status === "updating"){
            return {status: "rejected", data: null, error: action.payload}
        }
        
        return {...state}
    }

    return state
}


const reducer = combineReducers({
    connexion: connexionReducer,
    profile: profileReducer,
    fetch: fetchingReducer
})

export const store = createStore(reducer)

