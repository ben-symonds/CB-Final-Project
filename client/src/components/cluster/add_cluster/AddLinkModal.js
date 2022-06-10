import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import moment from 'moment';


import  { ClusterContext } from '../../contexts/ClusterContext';

const AddLinkModal = () => {

    const { setUpdate, setOpenAddClusterItemModal  } = useContext(ClusterContext);

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
        setUpdate(true);
        setOpenAddClusterItemModal(false);

    }

    
    return (
        <StyledForm onSubmit={handleSubmit}>
            <div> 
                <label htmlFor='link'> link: </label>
                <LinkInput 
                    required 
                    type='url'
                    id='link' 
                    placeholder='url...'
                    onChange={e => {
                        setUrl(e.target.value);
                    }}  
                />
            </div>
            <div> 
                <DescriptionField  
                    placeholder='add notes...'
                    onChange={e => {
                        setDescription(e.target.value);
                    }}  
                />
            </div>
            <div> 
                <Submit type='submit' value='Add Link' />
            </div>
        </StyledForm>
    )
}

const StyledForm = styled.form `
    padding-top: 20px;
    width: 520px;

    label {
        margin: 5px;
    }
`

const LinkInput = styled.input `
    height: 15px;
    width: 450px;
    font-size: 13px;
    font-family: monospace;

`

const DescriptionField = styled.textarea `
    width: 500px;
    height: 75px;
    margin-top: 20px;
`

const Submit = styled.input `
    margin-top: 20px;
    padding: 10px;
    cursor: pointer;

`
export default AddLinkModal;