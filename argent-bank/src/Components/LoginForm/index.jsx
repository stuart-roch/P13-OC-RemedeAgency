import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { fetchingAction, rejectedAction, resolvedAction } from "../../utils/store/store"
import { connexionLoginAction, connexionRememberUserAction } from "../../features/connexion"


function LoginForm({api}){

    const { register, handleSubmit, formState: {errors}, reset} = useForm()
    const dispatch = useDispatch()
    const hasError = useSelector(state => state.fetch.error !== null)
    const error = useSelector(state => state.fetch.error)
    let errMsg
    if(hasError){
        errMsg = error.message.split("Error: ")[1]
    }

    const onSubmit = async (data) => {
        
        dispatch(fetchingAction())
        const result = await api.postUserLogin(data.username,data.password)
        if(result.status > 200){
            dispatch(rejectedAction(result))
        }else{
            dispatch(resolvedAction(result))
            dispatch(connexionLoginAction())
            if(data.rememberUser){
                localStorage.setItem("token", result.body.token)
                dispatch(connexionRememberUserAction())
            }else{
                sessionStorage.setItem("token", result.body.token)
            }
            
        }
        reset({
            username: "",
            password: "",
            rememberUser: false
        })
    }

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {required: true})}/>
                {errors.username && <span className="error-msg">This field is required</span>}
                {!errors.username && errMsg === "User not found!" && <span className="error-msg">Incorrect username</span>}
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", {required: true})} />
                {errors.password && <span className="error-msg">This field is required</span>}
                {!errors.password && errMsg === "Password is invalid" && <span className="error-msg">Incorrect password</span>}
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" {...register("rememberUser")}/>
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
        </StyledForm>
    )

}


const StyledForm = styled.form`

    .sign-in-button {
        display: block;
        width: 100%;
        padding: 8px;
        font-size: 1.1rem;
        font-weight: bold;
        margin-top: 1rem;
        border-color: #00bc77;
        background-color: #00bc77;
        color: #fff;
    }

    .input-remember {
        display: flex;
    }

    .input-remember label {
        margin-left: 0.25rem;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-bottom: 1rem;
    }

    .input-wrapper label {
        font-weight: bold;
    }

    .input-wrapper input {
        padding: 5px;
        font-size: 1.2rem;
    }

    .error-msg {
        margin-top:5px;
        color:red;
        font-size:0.8rem;
    }

`
export default LoginForm