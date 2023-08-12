import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import styled from "styled-components"
import AccountElement from "../../Components/AccountElement"
import EditProfileForm from "../../Components/EditProfileForm"
import Loader from "../../Components/Loader"
import { profileInitAction, profileStartEditAction } from "../../features/profile" 
import { useEffect } from "react"
import { fetchingAction, resolvedAction, rejectedAction, voidAction } from "../../utils/store/store"
import { connexionLoginAction, connexionLogoutAction, connexionRememberUserAction } from "../../features/connexion"


const accounts = [
    {
        title : "Argent Bank Checking (x8349)",
        amount : "2,082.79",
        description : "Available Balance"
    },
    {
        title : "Argent Bank Savings (x6712)",
        amount : "10,928.42",
        description : "Available Balance"
    },
    {
        title : "Argent Bank Credit Card (x8349)",
        amount : "184.30",
        description : "Current Balance"
    },
]

function Profile({api}){

    const dispatch = useDispatch()
    const isEditing = useSelector(state => state.profile.editing)
    const isLogged = useSelector(state => state.connexion.isLogged)
    const user = useSelector(state => state.profile.user)
    const rememberUser = useSelector(state => state.connexion.rememberUser)
    const isLoading = useSelector(state => (state.fetch.status === "pending" || state.fetch.status === "updating"))
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

    useEffect(() => {

        async function fetchData(){

            const header = localStorage.length !== 0 ? 
                {'Authorization': `Bearer ${localStorage.getItem("token")}`}:
                {'Authorization': `Bearer ${sessionStorage.getItem("token")}`}         
            try{
                dispatch(fetchingAction())
                const result = await api.postUserProfile(header)
                
                if(result.status > 200){
                    if(result.status === 401 || result.status === 403){
                        dispatch(rejectedAction({message: "Error: Unauthorized"}))
                    }else{
                        dispatch(rejectedAction(result))
                    }
                }else{
                    const user = { id: result.body.id, firstName: result.body.firstName, lastName: result.body.lastName }
                    if(localStorage !== 0){
                        localStorage.setItem("user",JSON.stringify(user))    
                    }else{
                        sessionStorage.setItem("user",JSON.stringify(user))
                    }
                    dispatch(resolvedAction(result))
                    dispatch(profileInitAction(user))
                }
            }catch(error){
                dispatch(rejectedAction({message : "Error: Server issue"}))
            }
        }

        fetchData()
        
    
    },[api,dispatch,user.id,rememberUser])

    
    
    return !isLogged ? 
    (<Navigate to="/signIn" />)
    :
    (<Container>
        {isLoading && <Loader />}
        {(hasError && errMsg === "Server issue") && <p className="err-msg">Problème technique, veuillez nous excuser pour la gêne occassionné</p>}
        {(hasError && errMsg === "Unauthorized") && <p className="err-msg">Contenu non autorisé</p>}
        {!isLoading && !hasError && <>
        <div className="header">
        {isEditing ? 
            (<>
                <h1>Welcome back</h1>
                <EditProfileForm api={api} user={user} rememberUser={rememberUser}/>
            </>) :
            (<>
                <h1>Welcome back<br />{`${user.firstName} ${user.lastName}!`}</h1>
                <button className="edit-button" onClick={() => dispatch(profileStartEditAction())}>Edit Name</button>
            </>)
            }
        </div>
        {accounts.map(
            account => 
                <AccountElement key={account.title} title={account.title} amount={account.amount} description={account.description}/>
                )
            }
        </>}
    </Container>)
}

const Container = styled.main`

    background-color: #12002b;
    flex:1;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .edit-button {
        border-color: #00bc77;
        background-color: #00bc77;
        color: #fff;
        font-weight: bold;
        padding: 10px;
    }
      
    .header {
        color: #fff;
        margin-bottom: 2rem;
    }

    .err-msg{
        color:red;
        font-size: 3rem;
    }
    
    
`
export default Profile