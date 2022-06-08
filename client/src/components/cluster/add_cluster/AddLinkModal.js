import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import moment from 'moment';

const AddLinkModal = () => {


    console.log(moment().format('YYYYMMDD'));
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
            type: 'link',
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
    return (
        <StyledForm onSubmit={handleSubmit}>
            <div> 
                <label htmlFor='link'> link url </label>
                <input 
                    required 
                    type='url'
                    className='link' 
                    onChange={e => {
                        setUrl(e.target.value);
                    }}  
                />
            </div>
            <div> 
            <label htmlFor='description'> description </label>
                <textarea  
                    className='description'
                    onChange={e => {
                        setDescription(e.target.value);
                    }}  
                />
            </div>
            <div> 
                <input type='submit' />
            </div>
        </StyledForm>
    )
}

const StyledForm = styled.form `
    border: 1px black solid;
`
export default AddLinkModal;