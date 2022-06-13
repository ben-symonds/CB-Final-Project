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
            > X </Exit>
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
    border-left: 1px gray solid;
    
`
const Exit =  styled.button `
    font-size: 12px;

    &:hover {
        color: gray;
    }
`
export default VisibilityModal;