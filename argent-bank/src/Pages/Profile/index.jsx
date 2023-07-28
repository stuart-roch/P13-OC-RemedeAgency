import styled from "styled-components"
import AccountElement from "../../Components/AccountElement"


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

function Profile(){

    return (
        <Container>
            <div class="header">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <button class="edit-button">Edit Name</button>
            </div>
            {accounts.map(
                account => 
                    <AccountElement title={account.title} amount={account.amount} description={account.description}/>
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