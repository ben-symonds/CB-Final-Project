import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const VisibilityModal = ({visibility, setOpenChangeVisibilityModal, setVisibilitySetting}) => {

     //grabs cluster id from url 
    const { id } = useParams();

    const changeVisibility = async () => {
        await fetch(`/patch-cluster-visibility/${id}/${visibility === 'public' ? 'private' : 'public'}`, {
            method: "PATCH"
        }) .then(res => res.json())
        .then(data => {
            setVisibilitySetting(visibility === 'public' ? 'private' : 'public');
            setOpenChangeVisibilityModal(false);
        })

        
    }

    return (    
        <Wrapper>
            <Exit
                onClick={() => {
                    setOpenChangeVisibilityModal(false)
                }}
            > <div> X </div>  </Exit>
            {visibility === 'public' ?
            <button onClick={changeVisibility}> 
                make cluster private 
            </button>
            :<button onClick={changeVisibility}> 
                make cluster public 
            </button> }
        </Wrapper>
    )
}

const Wrapper = styled.div `
    height: 15px;
    font-size: 10px;
    display: flex;
    align-items: center;

    button {
        font-size: 12px;
    }
    
`
const Exit =  styled.button `
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    font-size: 10px;
    line-height: 10px;
    height: 15px;
    width: 15px;
    margin-left: 5px;
    border-radius: 50%;
    color: #fff;
    background-color: #000;

    &:hover {
        color: gray;
    }


`
export default VisibilityModal;