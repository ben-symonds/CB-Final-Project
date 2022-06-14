import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import  { ClusterContext } from '../../contexts/ClusterContext';

const DeleteClusterItem = ({itemId}) => {

    const { setUpdate } = useContext(ClusterContext);
     //grabs cluster id from url 
    const { id } = useParams();

    const [ openDeleteClusterItemModal, setOpenDeleteClusterItemModal ] = useState(false);

    const handleDelete = async () => {

        await fetch(`/delete-cluster-item/${id}/${itemId}`, {
            method: 'DELETE',
        })

        setUpdate(true);
    }
    
    return (
        <Wrapper>
            <DeleteButton 
                onClick={() => {
                    setOpenDeleteClusterItemModal(!openDeleteClusterItemModal);
                }}
            > 
                x
            </DeleteButton>
            {openDeleteClusterItemModal && 
                <ModalWrapper>
                    <button className='delete' onClick={handleDelete}> delete item </button>
                    <button
                        onClick={() => {
                            setOpenDeleteClusterItemModal(false)
                        }}
                    > 
                        cancel
                    </button>
                </ModalWrapper>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    height: 100%;
    align-items: center;
`

const DeleteButton = styled.button `
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: white;
    border-radius: 50%;
    background-color: black;
    width: 13px;
    height: 13px;
    line-height: 13px;
    margin-right: 15px;


    &:hover
    {
        background: darkgray;
    }
`

const ModalWrapper = styled.div `
    button {
        font-size: 13px;

        &:hover {
            color: darkgray;
        }

       
    }
    .delete {
        color: purple;
    }
`
export default DeleteClusterItem;

