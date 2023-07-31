const CONNEXION_LOGIN = "connexion/login"
const CONNEXION_LOGOUT = "connexion/logout"
const CONNEXION_REMEMBER_USER = "connexion/rememberUser"

const initState = {
    isLogged: false,
    rememberUser: false,
}

export const connexionLoginAction = () => ({ 
    type: CONNEXION_LOGIN
})

export const connexionLogoutAction = () => ({ 
    type: CONNEXION_LOGOUT
})

export const connexionRememberUserAction = () => ({ 
    type: CONNEXION_REMEMBER_USER
})

export default function connexionReducer(state = initState, action){

    if(action.type === CONNEXION_LOGIN){
        return { ...state, isLogged: true }
    }

    if(action.type === CONNEXION_LOGOUT){
        return { isLogged: false, 
            rememberUser: false }
    }

    if(action.type === CONNEXION_REMEMBER_USER){
        return { ...state, rememberUser: true  }
    }

    return state
}