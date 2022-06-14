import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import  { ClusterContext } from '../../contexts/ClusterContext';

const AddTextModal = () => {

    const { setUpdate, setOpenAddClusterItemModal  } = useContext(ClusterContext);

    const { id } = useParams();

    const [ text, setText ] = useState(null);
    const [ url, setUrl ] = useState('');
    const [ header, setHeader ] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();

        const newClusterItem = {
            datePublished: moment().format('MMMM Do YYYY, h:mm a'),
            itemId: uuidv4(),
            type: 'text',
            link: url,
            header: header,
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
        <StyledForm onSubmit={handleSubmit}>
            <div>
            <label htmlFor='header'> Header(optional): </label>  
            <input  
                type='text'
                id='header' 
                placeholder='url...'
                onChange={e => {
                    setHeader(e.target.value);
                }}  
            />
            </div>
            <div>
                <label htmlFor='body'> Body: </label>  
                <textarea 
                    id='body'
                    required 
                    placeholder='your text here' 
                    onChange={e => {
                        setText(e.target.value);
                    }}
                />   
            </div>
            <div>
                <label htmlFor='link'> Source link(optional): </label>
                <input 
                    type='url'
                    id='link' 
                    placeholder='url...'
                    onChange={e => {
                        setUrl(e.target.value);
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
    padding-top: 20px;
    width: 550px;
    height: 400px;
    border: 1px lightgray solid;
    border-top: none;

    label {
        margin: 5px;
    }
`

export default AddTextModal;