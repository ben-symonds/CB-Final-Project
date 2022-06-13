import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import  Axios from 'axios';
import styled from 'styled-components';
import { Image } from 'cloudinary-react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import  { ClusterContext } from '../../contexts/ClusterContext';

const AddImageModal = () => {

    const { setUpdate, setOpenAddClusterItemModal  } = useContext(ClusterContext);

    //grabs cluster id from url 
    const { id } = useParams();

    const [ description, setDescription ] = useState(null);
    const [ uploadedFile, setUploadedFile ] = useState(null);



    const handleUpload = (file) => {
        console.log(file)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mfyjij9r');

        Axios.post('https://api.cloudinary.com/v1_1/desecho/image/upload', 
            formData
        ).then((response) => {
            console.log(response);
            setUploadedFile(response.data);
        })
    }

    const handlePost = async () => {

        const newClusterItem = {
            datePublished: moment().format('MMMM Do YYYY, h:mm a'),
            description: description,
            itemId: uuidv4(),
            type: 'image',
            url: uploadedFile.url,
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
            <StyledForm>
                <FileInput 
                    type='file' 
                    onChange={e => {
                        handleUpload(e.target.files[0])
                    }}
                    onClick={() => {
                        setUploadedFile(null);
                    }}
                /> 
            </StyledForm>
            {uploadedFile && 
            <>
            <Image cloudName={'desecho'} publicId={uploadedFile.url}  /> 
            <DescriptionField
                placeholder='add notes...'
                onChange= {e => {
                    setDescription(e.target.value);
                }}
            /> 
            <PostButton onClick={handlePost} > Add Image </PostButton>
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

const DescriptionField = styled.textarea `
    margin-top: 10px;
    width: 400px;
    height: 75px;
`

const PostButton = styled.button `
    margin-top: 10px;
    border: 1px #000 solid;
    padding: 5px;
    border-radius: 3px;
`


export default AddImageModal; 