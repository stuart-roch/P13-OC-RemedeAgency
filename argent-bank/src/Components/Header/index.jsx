import styled from "styled-components";
import { NavLink, Link, useNavigate } from "react-router-dom";
import LogoUrl from "../../assets/img/argentBankLogo.png"
import { useDispatch, useSelector } from "react-redux";
import { connexionLogoutAction } from "../../features/connexion";

function Header(){

    const isLogged = useSelector(state => state.connexion.isLogged)
    const user = useSelector(state => state.profile.user)
    const rememberUser = useSelector(state => state.connexion.rememberUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutEvent = (e) => {
        e.preventDefault()
        if(rememberUser){
            localStorage.clear()
        }else{
            sessionStorage.clear()
        }
        
        
        dispatch(connexionLogoutAction())
        navigate("/")
    }


    return (
        <StyledHeader>
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img
                    className="main-nav-logo-image"
                    src={LogoUrl}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    {
                    isLogged ? 
                    (<>
                        <NavLink className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {user.firstName}
                        </NavLink>
                        <Link className="main-nav-item" onClick={e => logOutEvent(e)}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>)
                    :
                    (<NavLink className="main-nav-item" to="/signIn">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>)
                    }
                </div>
            </nav>
        </StyledHeader>
    )
}


const StyledHeader = styled.header`

    .main-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 20px;
    }

    .main-nav-logo {
        display: flex;
        align-items: center;
        }

    .main-nav-logo-image {
        max-width: 100%;
        width: 200px;
        }

    .main-nav-item {
        
        text-decoration: none;
        margin-right: 0.5rem;
        font-weight: bold;
        color: #2c3e50;
        }

    .main-nav-item:hover {
        text-decoration: underline;
        }

    .fa-user-circle{
        margin-right: 5px;
    }

    .active{
        color: #42b983;
    }

`

export default Header