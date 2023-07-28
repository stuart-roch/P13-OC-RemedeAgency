import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LogoUrl from "../../assets/img/argentBankLogo.png"

function Header(){
    return (
        <StyledHeader>
            <nav className="main-nav">
                <StyledNavLink to="/" className="main-nav-logo">
                    <img
                    className="main-nav-logo-image"
                    src={LogoUrl}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </StyledNavLink>
                <div>
                    <StyledNavLink className="main-nav-item" to="/signIn">
                        <i className="fa fa-user-circle"></i>
                        <p>Sign In</p>
                    </StyledNavLink>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        margin-right: 0.5rem;
        }

    .main-nav-item p:hover {
        text-decoration: underline;
        }

    .fa-user-circle{
        margin-right: 5px;
    }

`

const StyledNavLink = styled(NavLink)`

    font-weight: bold;
    color: #2c3e50;

    .active{
        color: #42b983;
    }

`
export default Header