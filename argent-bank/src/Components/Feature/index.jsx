import styled from "styled-components"

function Feature({iconUrl, title, text}){

    return (

        <Container>
            <img src={iconUrl} alt="" className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{text}</p>
        </Container>

    )

}

const Container = styled.div`

    flex: 1;
    padding: 2.5rem;

    .feature-icon {
        width: 100px;
        border: 10px solid #00bc77;
        border-radius: 50%;
        padding: 1rem;
    }

    .feature-item-title {
        color: #222;
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

`

export default Feature