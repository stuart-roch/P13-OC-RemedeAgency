import styled from "styled-components"


function Loader(){
    return (
        <Container>
            <i className="fa fa-rotate-right"></i>
        </Container>
    )
}

const Container = styled.div`

    position:absolute;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    top:0;
    font-size:5rem;
    color: #00BC78;
    
    .fa-rotate-right{
        animation:3s linear infinite both rotate;
    }

    @keyframes rotate{
        from{
            tranform:rotate(0deg);
        }
        to{
            transform:rotate(360deg);
        }
    }

`

export default Loader