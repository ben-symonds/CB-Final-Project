import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';

const DeleteClusterModal = ({setOpenDeleteClusterModal}) => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    //grabs cluster id from url 
    const { id } = useParams();



    const handleDelete = async () => {

        await fetch(`/delete-cluster/${id}`, {
            method: 'DELETE',
        })
        navigate(`/user/${user.uid}`)
    }

    return(
        <Wrapper>
            <button onClick={handleDelete}>
                delete
            </button>
            <button
                onClick={() => {
                    setOpenDeleteClusterModal(false);
                }}
            > 
                cancel
            </button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    width: 90px;
    justify-content: space-between;

    button {
        &:hover {
            color: lightgray;
        }
    }
`

export default DeleteClusterModal;