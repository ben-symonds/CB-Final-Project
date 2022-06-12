import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <>
            <button 
                onClick={() => {
                    setOpenDeleteClusterItemModal(true);
                }}
            > 
                X   
            </button>
            {openDeleteClusterItemModal && 
                <>
                    <button onClick={handleDelete}> delete </button>
                    <button
                        onClick={() => {
                            setOpenDeleteClusterItemModal(false)
                        }}
                    > 
                        cancel
                    </button>
                </>
            }
        </>
    )
}

export default DeleteClusterItem;

