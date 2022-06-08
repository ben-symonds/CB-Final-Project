import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import  { ClusterContext } from '../../contexts/ClusterContext';

const DeleteClusterItem = ({itemId}) => {

    const { setUpdate } = useContext(ClusterContext);
     //grabs cluster id from url 
    const { id } = useParams();

    const handleDelete = async () => {

        await fetch(`/delete-cluster-item/${id}/${itemId}`, {
            method: 'DELETE',
        })

        setUpdate(true);
    }
    
    return (
        <button onClick={handleDelete}> X </button>
    )
}

export default DeleteClusterItem;

