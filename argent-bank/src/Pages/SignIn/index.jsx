import styled from "styled-components"
import LoginForm from "../../Components/LoginForm"
import { connexionLoginAction, connexionRememberUserAction } from "../../features/connexion"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { profileInitAction } from "../../features/profile"
import { useEffect } from "react"


function SignIn({api}){

    const dispatch = useDispatch()
    const isLogged = useSelector(state => state.connexion.isLogged)

    useEffect(() => {
        if(localStorage.length !== 0){
            dispatch(connexionLoginAction())
            dispatch(connexionRememberUserAction())
            dispatch(profileInitAction(JSON.parse(localStorage.getItem("user"))))
        }else if(sessionStorage.length !== 0){
            dispatch(connexionLoginAction())
            dispatch(profileInitAction(JSON.parse(sessionStorage.getItem("user"))))
        }
    },[dispatch])
    
    return isLogged ? 
    (<Navigate to="/profile" />)
    : (
        <Container>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
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
        background-color: white;
        width: 300px;
        margin: 0 auto;
        margin-top: 3rem;
        padding: 2rem;
    }
    
    .sign-in-icon {
        font-size: 5rem;
    }
    
    
    
`
export default SignIn