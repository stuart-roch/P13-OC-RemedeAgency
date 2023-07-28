import styled from "styled-components"
import LoginForm from "../../Components/LoginForm"


function SignIn(){
    
    return (
        <Container>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <LoginForm />
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