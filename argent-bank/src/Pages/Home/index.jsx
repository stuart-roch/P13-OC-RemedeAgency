import styled from "styled-components"
import Hero from "../../Components/Hero"
import Feature from "../../Components/Feature"
import IconChat from "../../assets/img/icon-chat.png"
import IconMoney from "../../assets/img/icon-money.png"
import IconSecurity from "../../assets/img/icon-security.png"
import { useDispatch } from "react-redux"
import { connexionLoginAction, connexionRememberUserAction, connexionLogoutAction } from "../../features/connexion"
import { profileInitAction } from "../../features/profile"
import { voidAction } from "../../utils/store/store"
import { useEffect } from "react"



const features = [
    {
        iconUrl : IconChat, 
        title : "You are our #1 priority",
        text : "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
        iconUrl : IconMoney, 
        title : "More savings means higher rates",
        text : "The more you save with us, the higher your interest rate will be!"
    },
    {
        iconUrl : IconSecurity, 
        title : "Security you can trust",
        text : "We use top of the line encryption to make sure your data and money is always safe."
    }
]

function Home(){
    
    const dispatch = useDispatch()

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
    

    return (
        <Container>
            <Hero />
            <section className="features">
                {features.map((feature,index) => <Feature key={index} iconUrl={feature.iconUrl} title={feature.title} text={feature.text}/>)}
            </section>
        </Container>
    )

}

const Container = styled.main`

    .features {
        display: flex;
        flex-direction: column;
    }
  
    @media (min-width: 920px) {
        .features {
            flex-direction: row;
        }
    }

`
export default Home