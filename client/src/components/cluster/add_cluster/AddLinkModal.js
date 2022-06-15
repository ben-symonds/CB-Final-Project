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
    const [ name, setName ] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        const newClusterItem = {
            datePublished: moment().format('MMMM Do YYYY, h:mm a'),
            description: description,
            itemId: uuidv4(),
            name: name,
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
                
                    <label htmlFor='name'> Name </label>
                    <NameInput 
                        type='text'
                        id='name'
                        placeholder='link name(optional)...'
                        onChange={e => {
                            setName(e.target.value);
                        }}
                    />
                    </div>
                <div>
                    <label htmlFor='link'> Link </label>
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
            
            <DescriptionWrapper> 
                <label htmlFor='description'> Notes </label>
                <DescriptionField  
                    id='description'
                    placeholder='add notes(optional)...'
                    onChange={e => {
                        setDescription(e.target.value);
                    }}  
                />
            </DescriptionWrapper>
            <div> 
                <Submit type='submit' value='Add Link to Cluster' />
            </div>
        </StyledForm>
    )
}

const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 20px;
    width: 550px;
    color: #2E2D2B;
    height: 400px;
    border-radius: 6px;
    border: 1px lightgray solid;
    border-top: none;

    label {
        font-size: 20px;
    }
`

const LinkInput = styled.input `
    height: 25px;
    margin-left: 10px;
    color: #2E2D2B;
    width: 450px;
    border: lightgray 1px solid;
    border-radius: 6px;
    font-size: 13px;
    letter-spacing: 2px;
    font-family: 'Amiri', serif;
    padding: 0px 5px;
    &:focus {
        border: 1px solid gray;
    }

`

const NameInput = styled.input `
    height: 25px;
    margin-bottom: 20px;
    width: 200px;
    padding: 0px 5px;
    font-family: 'Amiri', serif;
    border-radius: 6px;
    border: lightgray 1px solid;
    margin-left: 10px;
    letter-spacing: 1px;
    font-size: 13px;
    &:focus {
        border: 1px solid gray;
    }
`
const DescriptionWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DescriptionField = styled.textarea `
    width: 500px;
    height: 75px;
    font-size: 14px;
    resize: none;
    padding-left: 10px;
    margin-top: 5px;
    border: 1px solid lightgray;
    border-radius: 5px;
    letter-spacing: 1px;
`

const Submit = styled.input `
    margin-top: 5px;
    font-size: 20px;
    font-family: 'Amiri', serif;
    margin-top: 5px;
    border: 1px solid lightgray;
    background-color: #fff;
    height: 40px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        border: 1px solid #202121;
    }
`
export default AddLinkModal;