import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';

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
            <div>
            <DeleteButton 
                onClick={() => {
                    setOpenDeleteClusterItemModal(!openDeleteClusterItemModal);
                }}
            > 
                <TiDelete size='20' />
            </DeleteButton>
            </div>
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

`

const DeleteButton = styled.button `
    padding-top: 3px;
    height: 15px;
    margin-right: 10px;
    &:hover
    {
        color: darkgray;
    }
`

const ModalWrapper = styled.div `

    height: 10px;
    button {
        font-size: 15px;
        margin-right: 15px;

        &:hover {
            color: darkgray;
        }
    }
`
export default DeleteClusterItem;

