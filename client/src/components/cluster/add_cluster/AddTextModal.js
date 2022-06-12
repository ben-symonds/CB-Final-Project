import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import  { ClusterContext } from '../../contexts/ClusterContext';

const AddTextModal = () => {

    const { setUpdate, setOpenAddClusterItemModal  } = useContext(ClusterContext);

    const { id } = useParams();

    const [ text, setText ] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        const newClusterItem = {
            datePublished: moment().format('MMMM Do YYYY, h:mm a'),
            itemId: uuidv4(),
            type: 'text',
            text: text,
        }

        await fetch(`/post-cluster-item/${id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                'Accept' : 'application/json',
            },
            body: JSON.stringify(newClusterItem)
        })

        setUpdate(true);
        setOpenAddClusterItemModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div> 
                <textarea 
                    required 
                    placeholder='your text here' 
                    onChange={e => {
                        setText(e.target.value);
                    }}
                />
            </div>
            <div> 
                <input type='submit' />
            </div>
        </form>
    )
}

export default AddTextModal;