import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import  { ClusterContext } from '../../contexts/ClusterContext';

const AddImageModal = () => {

    const { setUpdate, setOpenAddClusterItemModal  } = useContext(ClusterContext);

    //grabs cluster id from url 
    const { id } = useParams();

    const [ file, setFile ] = useState(null);
    const [ fileName, setFileName ] = useState(null); 
    const [ description, setDescription ] = useState(null);
    const [ uploadedFile, setUploadedFile ] = useState(null);


    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try{
            const res = await axios.post('/post-cluster-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const { name, path } = res.data.data;

            setUploadedFile({name, path});
        } catch(err) { 
            if(err.response.status === 500) {
                console.log('Problem with the server')
            } else {
                console.log(err.res.data.message);
            }
        }
    }

    const handlePost = async () => {

        const newClusterItem = {
            datePublished: moment().format('MMMM Do YYYY, h:mm a'),
            description: description,
            itemId: uuidv4(),
            type: 'image',
            path: uploadedFile.path,
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
        <Wrapper>
            <StyledForm onSubmit={handleSubmit}>
                <FileInput 
                    type='file' 
                    onChange={e => {
                        setFile(e.target.files[0]);
                        setFileName(e.target.files[0].name)
                    }}
                    onClick={() => {
                        setUploadedFile(null);
                        setFileName(null);
                        setFile(null);
                    }}
                /> 
                {file && <input type='submit' value='Preview Image' /> }
            </StyledForm>
            {uploadedFile && 
            <>
            <ImageWrapper>
                <img src={uploadedFile.path} />
            </ImageWrapper>
            <DescriptionField
                placeholder='add notes...'
                onChange= {e => {
                    setDescription(e.target.value);
                }}
            /> 
            <SubmitButton onClick={handlePost}> Add Image </SubmitButton>
            </>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div `
    padding-top: 20px;
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FileInput = styled.input`
    
`

const StyledForm = styled.form `
    width: 100%;
    justify-content: center;
    display: flex;
`

const ImageWrapper = styled.div `
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 400px;
    overflow: hidden;

    img {
        max-width:100%;
        max-height:100%;
    }
`

const DescriptionField = styled.textarea `
    margin-top: 10px;
    width: 400px;
    height: 75px;
`

const SubmitButton = styled.button `
    margin-top: 10px;
    border: 1px #000 solid;
    padding: 5px;
    border-radius: 3px;
`


export default AddImageModal; 