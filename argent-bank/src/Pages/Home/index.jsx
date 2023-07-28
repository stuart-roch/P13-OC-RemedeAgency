import styled from "styled-components"
import Hero from "../../Components/Hero"
import Feature from "../../Components/Feature"
import IconChat from "../../assets/img/icon-chat.png"
import IconMoney from "../../assets/img/icon-money.png"
import IconSecurity from "../../assets/img/icon-security.png"
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

    useEffect(() => {
        async function FetchData(){

            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "POST",
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YmZmODg0ZDc1MDg5MjE5Y2Y3NDRjZSIsImlhdCI6MTY5MDU0NTA4NSwiZXhwIjoxNjkwNjMxNDg1fQ._ilKb4XSz1ohHAeHhuEhXpVYjVqfn6HShzcumy6QWr8",
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            console.log(data)
        }

        FetchData()
    },[])

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