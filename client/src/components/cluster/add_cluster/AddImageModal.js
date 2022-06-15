import { useState, useContext, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  Axios from 'axios';
import styled from 'styled-components';
import { Image } from 'cloudinary-react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useDropzone } from 'react-dropzone';
import { FiPlus } from 'react-icons/fi';

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

   

    const onDrop = useCallback( (acceptedFiles, rejectedFiles) => {

        const file = acceptedFiles[0];
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mfyjij9r');

        Axios.post('https://api.cloudinary.com/v1_1/desecho/image/upload', 
            formData
        ).then((response) => {
            console.log(response);
            setUploadedFile(response.data);
        })

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    })

    useEffect(() => {
        console.log('yes');
    }, [isDragActive])

    return (
        <Wrapper>
            {!uploadedFile &&
                <StyledDropBox className='dropzone' {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? <h3> Drop Image Here </h3>
                    :<DragWrapper>
                        {/* <FiPlus size='100' /> */}
                        <div>
                            <h3> Drag & Drop Image </h3> 
                                <p style={{fontSize: '20px', color: 'gray', textAlign: 'center'}}> or </p>
                            <h3> <span style={{fontSize: '30px', fontWeight: '500'}}> Click </span> to Upload File  </h3> 
                        </div>
                        {/* <FiPlus size='100' /> */}
                    </DragWrapper>}
                </StyledDropBox>
            }   
            {/* <StyledForm>
                <FileInput 
                    type='file' 
                    onChange={e => {
                        handleUpload(e.target.files[0])
                    }}
                    onClick={() => {
                        setUploadedFile(null);
                    }}
                /> 
            </StyledForm> */}
            {uploadedFile && 
            <>
                <ImageWrapper>
                    <StyledImage cloudName={'desecho'} publicId={uploadedFile.url}  /> 
                </ImageWrapper>
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
    width: 550px;
    height: 400px;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    border-top: none;
    align-items: center;
`

const FileInput = styled.input`
    padding-bottom: 9px;


`

const DragWrapper = styled.div `
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #3d3d3d;
    transition: transform 1s;
   
`

const StyledForm = styled.form `    
    
   
`

const StyledDropBox = styled.div `
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 90%;
    border-radius: 10px;
    cursor: pointer;

    h3 {
        font-weight: 200;
        font-size: 30px;
        color: #3d3d3d;
    }
`

const ImageWrapper = styled.div `
    width: 100%;
    height: 505px;
    align-items: center;
    display: flex;
    justify-content: center;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
`

const StyledImage = styled(Image)`    
    max-width: 500px;
    max-height: 250px;
    min-height: 200px;
    

`

const DescriptionField = styled.textarea `
    margin-top: 10px;
    width: 500px;
    resize: none;
    border: 1px solid lightgray;
    padding: 5px;
    font-size: 13px;
    height: 75px;
`

const PostButton = styled.button `
    font-size: 14px;
    font-family: 'Amiri', serif;
    margin-top: 5px;
    border: 1px solid lightgray;
    background-color: #fff;
    height: 30px;
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 3px 5px;

    &:hover {
        border: 1px solid #202121;
    }
`


export default AddImageModal; 