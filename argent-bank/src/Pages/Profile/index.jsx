import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import styled from "styled-components"
import AccountElement from "../../Components/AccountElement"
import EditProfileForm from "../../Components/EditProfileForm"
import { profileInitAction, profileStartEditAction } from "../../features/profile" 
import { useEffect } from "react"
import { fetchingAction, resolvedAction, rejectedAction } from "../../utils/store/store"


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

    useEffect(() => {

        async function fetchData(){

            const header = rememberUser ? 
                {'Authorization': `Bearer ${localStorage.getItem("token")}`}:
                {'Authorization': `Bearer ${sessionStorage.getItem("token")}`}            

            dispatch(fetchingAction())
            const result = await api.postUserProfile(header)
            
            if(result.status > 200){
                dispatch(rejectedAction(result))
            }else{
                const user = { id: result.body.id, firstName: result.body.firstName, lastName: result.body.lastName }
                if(rememberUser){
                    localStorage.setItem("user",JSON.stringify(user))    
                }else{
                    sessionStorage.setItem("user",JSON.stringify(user))
                }
                dispatch(resolvedAction(result))
                dispatch(profileInitAction(user))
            }
        }
        if(user.id === null){
            fetchData()
        }
        

    },[api,dispatch,user.id,rememberUser])
    
    return !isLogged ? 
    (<Navigate to="/signIn" />)
    :
    (
        <Container>
            <div className="header">
            {isEditing ? 
                (<>
                    <h1>Welcome back</h1>
                    <EditProfileForm user={user}/>
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
        </Container>
    )
}

const Container = styled.main`

    background-color: #12002b;
    flex:1;

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
`
export default Profile