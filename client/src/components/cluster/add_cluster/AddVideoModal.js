import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
//uuid is used to assign a unique id to the cluster
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import moment from 'moment';

import  { ClusterContext } from '../../contexts/ClusterContext';

const AddVideoModal = () => {

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

        setUpdate(true);
        setOpenAddClusterItemModal(false);
    }

    return(
        <StyledForm onSubmit={handleSubmit} >
            <UrlInputWrapper> 
                <label style={{fontSize: '20px'}} htmlFor='url'> Enter url </label>
                <input required id='url' type='url' onChange={e =>  setUrl(e.target.value) } />
                <p> Supports content from YouTube, Dailymotion, SoundCloud, and Vimeo. </p>
            </UrlInputWrapper>
            {url && 
                <VideoContentWrapper>
                <div> 
                    <ReactPlayer width='450px' height='230px' url={url} />
                </div> 
                
                <label htmlFor='description'> </label>
                <Description id='description' placeholder='Add Notes(optional) ...' onChange={e=> setDescription(e.target.value)} />
                <div> 
                    <Submit value='Add Media to Cluster' type='submit'/>
                </div>
             </VideoContentWrapper> }   
        </StyledForm>
    )
}

const StyledForm = styled.form `
    text-align: center;
    padding: 10px;
    width: 550px;
    height: 400px;
    border: 1px solid lightgray;
    border-top: none;
`

const UrlInputWrapper = styled.div `
    width: 100%;
    p {
        margin-top: 5px;
        padding-bottom: 5px;
        font-size: 13px;
    }
    border-bottom: 1px lightgray solid;
    margin-bottom: 10px;
    
    input {
        border: 1px solid lightgray;
        height: 18px;
        width: 200px;
        border-radius: 5px;
        &:focus {
            border: 1px solid gray;
        }
    }


`

const VideoContentWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Description = styled.textarea `
    margin-top: 5px;
    width: 500px;
    resize: none;
    height: 50px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 13px;
    padding: 5px;

`

const Submit = styled.input `
    font-size: 20px;
    font-family: 'Amiri', serif;
    margin-top: 5px;
    border: 1px solid lightgray;
    background-color: #fff;
    border-radius: 5px;

    &:hover {
        border: 1px solid #202121;
    }
`
export default AddVideoModal;

