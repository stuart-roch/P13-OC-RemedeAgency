import styled from "styled-components"
import LoginForm from "../../Components/LoginForm"
import { connexionLoginAction, connexionRememberUserAction, connexionLogoutAction } from "../../features/connexion"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { profileInitAction } from "../../features/profile"
import { voidAction } from "../../utils/store/store"
import { useEffect } from "react"   


function SignIn({api}){

    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.connexion.isLogged)
    const hasError = useSelector(state => state.fetch.error !== null)
    const error = useSelector(state => state.fetch.error)
    let errMsg
    if(hasError){
        errMsg = error.message.split("Error: ")[1]
    }

    useEffect(() => {

        if(localStorage.length !== 0 && sessionStorage.length === 0){
            dispatch(connexionLoginAction())
            dispatch(connexionRememberUserAction())
            dispatch(profileInitAction(JSON.parse(localStorage.getItem("user"))))
            dispatch(voidAction())
        }else if(sessionStorage.length !== 0 && localStorage.length === 0){
            dispatch(connexionLoginAction())
            dispatch(profileInitAction(JSON.parse(sessionStorage.getItem("user"))))
            dispatch(voidAction())
        }else{
            dispatch(connexionLogoutAction())
            dispatch(voidAction())
            localStorage.clear()
            sessionStorage.clear()
        }

    },[dispatch])
    
    return isLogged ? 
    (<Navigate to="/profile" />)
    : (
        <Container>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                {hasError && errMsg === "Server issue" && <p className="err-msg">Problème technique, veuillez réessayer ultérieurement</p>}
                <LoginForm api={api}/>
            </section>
        </Container>
    )
}

const Container = styled.main`

    background-color: #12002b;
    flex:1;
  
    .sign-in-content {
        box-sizing: border-box;
        position: relative;
        background-color: white;
        width: 300px;
        margin: 0 auto;
        margin-top: 3rem;
        padding: 2rem;
    }
    
    .sign-in-icon {
        font-size: 5rem;
    }

    .err-msg{
        margin-top:5px;
        color:red;
        font-size:0.8rem;
    }
    
`
export default SignIn