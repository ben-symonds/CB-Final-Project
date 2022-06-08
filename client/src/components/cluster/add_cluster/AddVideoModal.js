import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
//uuid is used to assign a unique id to the cluster
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import moment from 'moment';


const AddVideoModal = () => {

    //grabs cluster id from url 
    const { id } = useParams();

    const [ url, setUrl ] = useState(null);
    const [ description, setDescription ] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        const newClusterItem = {
            datePublished: moment().format('MMMM Do YYYY, h:mm a'),
            description: description,
            itemId: uuidv4(),
            type: 'playable media',
            url: url,
        }

        await fetch(`/post-cluster-item/${id}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                'Accept' : 'application/json',
            },
            body: JSON.stringify(newClusterItem)
        })
    }

    return(
        <StyledForm onSubmit={handleSubmit} >
            <div> 
                <label htmlFor='url'> enter url </label>
                <input required className='url' type='url' onChange={e =>  setUrl(e.target.value) } />
            </div>
            {url && 
                <div> 
                    <ReactPlayer url={url} />
                </div> 
            }
            <label htmlFor='description'> add description </label>
            <input type='text' className='description' onChange={e=> setDescription(e.target.value)} />
            <div> 
                <input type='submit'/>
            </div>
        </StyledForm>
    )
}

const StyledForm = styled.form `
    padding: 10px;
    border: 1px solid black;
`

export default AddVideoModal;

