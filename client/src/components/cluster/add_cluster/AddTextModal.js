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
            <label htmlFor='header'> Header </label>  
            <HeaderInput  
                type='text'
                id='header' 
                placeholder='add header(optional)...'
                onChange={e => {
                    setHeader(e.target.value);
                }}  
            />
            </div>
            <TextBodyWrapper>
                <label htmlFor='body'> Body </label>  
                <TextBody  
                    id='body'
                    required 
                    placeholder='your text here' 
                    onChange={e => {
                        setText(e.target.value);
                    }}
                />   
            </TextBodyWrapper>
            <SourceWrapper>
                <label htmlFor='link'> Source </label>
                <input
                    type='url'
                    id='link' 
                    placeholder='add url(optional)...'
                    onChange={e => {
                        setUrl(e.target.value);
                    }}  
                />
            </SourceWrapper>

            
                <Submit value='Add Text to Cluster' type='submit' />
        </StyledForm>
    )
}
const StyledForm = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    width: 550px;
    height: 400px;
    border: 1px lightgray solid;
    border-top: none;

    label {
        margin: 5px;
        font-size: 20px;
    }
`

const HeaderInput = styled.input `

    width: 200px;
    height: 20px;
    border: lightgray 1px solid;
    border-radius: 5px;
    font-family: 'Amiri', serif;
    font-size: 15px;
    padding-left: 8px;
    letter-spacing: 1px;
    &:focus {
        border: 1px solid gray;
    }

`

const TextBodyWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0px;

`
const TextBody = styled.textarea `
    margin-top: 3px;
    width: 450px;
    height: 200px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 14px;
    resize: none;
    padding: 8px;
    letter-spacing: 1px;
    &:focus {
        border: 1px solid gray;
    }
`

const SourceWrapper = styled.div `

    input {
        width: 300px;
        height: 20px;
        border: lightgray 1px solid;
        border-radius: 5px;
        font-family: 'Amiri', serif;
        font-size: 15px;
        letter-spacing: 1px;
        padding-left: 8px;
        font-size: 15px;
        margin-bottom: 10px;
        &:focus {
            border: 1px solid gray;
        }
    }
`

const Submit = styled.input `
    margin-top: 5px;
    font-size: 20px;
    font-family: 'Amiri', serif;
    margin-top: 5px;
    border: 1px solid lightgray;
    background-color: #fff;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        border: 1px solid #202121;
    }
`
export default AddTextModal;