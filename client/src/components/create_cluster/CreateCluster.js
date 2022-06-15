import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//uuid is used to assign a unique id to the cluster
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import moment from 'moment';

import { UserContext } from '../contexts/UserContext';
import AddTagsNewCluster from './AddTagsNewCluster';
import LoadingDots from '../reusable/LoadingDots';

const CreateCluster = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    //state variables storing form data
    const [ title, setTitle ] = useState(null);
    const [ tags, setTags ] = useState([]);
    const [ description, setDescription ] = useState(null);
    const [ publicCluster, setPublicCluster ] = useState(true);
    const [ privateCluster, setPrivateCluster ] = useState(false);
    const [ loading, setLoading ] = useState(true);


    useEffect(() => {
        setLoading(false)
    }, [user])

    const handleSubmit = async e => {
        e.preventDefault();
        //creates a  cluster object skeleton with some identifiers
        const newCluster = {
            datePublished: moment().format('MMMM Do YYYY, h:mm a'),
            description: description,
            userId: user.uid,
            clusterId: uuidv4(),
            items: [],
            tags: tags,
            title: title,
            visibility: publicCluster ? 'public' : 'private',
        }

        //posts new cluster to DB
        await fetch("/post-cluster", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                'Accept' : 'application/json',
            },
            body: JSON.stringify(newCluster)
        })

        //navigates to edit cluster page to begin adding items to cluster
        navigate(`/cluster/${newCluster.clusterId}`)

    }

    return ( 
        <>
        {loading ? 
        <div> <LoadingDots /> </div>
        :<>{user ?
                <Wrapper>
                <ContentWrapper>
                    <h1> New Cluster </h1>
                    <TagsWrapper>
                        <AddTagsNewCluster tags={tags} setTags={setTags}/> 
                    </TagsWrapper>
                    <FormShell onSubmit={handleSubmit}> 
                        
                        <Title> 
                            <label htmlFor='title'> Title </label>
                            <input 
                                placeholder='add title...'
                                type='text' 
                                id='title' 
                                maxLength='30'
                                required
                                onChange={e => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </Title>
                        <Description> 
                            <label htmlFor='description'> Description </label>
                            <textarea 
                                id='description'
                                placeholder='add a description(optional)...'
                                onChange={e => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </Description>
                        <Visibility>
                            <h3> Visibility </h3> 
                            <RadioButtons> 
                                <div>
                                <label htmlFor='public'> Public </label>
                                <input 
                                    type='radio' 
                                    value='Public' 
                                    id='public' 
                                    name='visibility'
                                    defaultChecked
                                    onChange={() => {
                                        setPublicCluster(!publicCluster);
                                        setPrivateCluster(!privateCluster);
                                    }}
                                />
                                </div>
                                <div>
                                <label htmlFor='private'> Private </label>
                                <input 
                                    type='radio' 
                                    name='visibility'
                                    value='Private' 
                                    id='private'
                                    onChange={() => {
                                        setPublicCluster(!publicCluster);
                                        setPrivateCluster(!privateCluster);
                                    }}
                                />
                                </div>
                            </RadioButtons>
                        </Visibility>
                        <Submit type='submit' value='Create Cluster' />
                    </FormShell>
                </ContentWrapper>
            </Wrapper>
            :<div> there's nothing here </div>
            
        }</>
        }
        </>
    )
}

const Wrapper = styled.div`
    width 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ContentWrapper = styled.div `
    width: 600px;
    height: 600px;
    margin-top: 50px;
    border: 1px lightgray solid;
    border-radius: 10px;
    box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

    h1 {
        font-size: 45px;
        font-weight: 300;
        width: 100%;
        border-radius: 10px;
        text-align: center;
        padding: 20px;
        font-style: italic;
        border-bottom: 1px lightgray solid;
    }
`

const TagsWrapper = styled.div `
    margin-top: 30px;
    display: flex;
    height: 40px;
    flex-direction: column;
    align-items: center;

`
const FormShell = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div `
    display: flex;
    margin-top: 10px;
    flex-direction: column;

    label {
        font-size: 30px;
        margin-right: 15px;
    }

    input { 
        font-size: 25px;
        padding: 5px;
        padding-left: 10px;
        font-family: 'Amiri', serif;
        width: 445px;
        height: 25px;
        border: 1px lightgray solid;
        &:focus {
            border: 1px solid gray;
        }
        border-radius: 5px;
    }
`

const Description = styled.div `
    display: flex;
    flex-direction: column;
    margin-top: 35px;

    label {
        font-size: 30px;
        margin-right: 15px;
        padding-top: 4px;
        margin-bottom: 5px;
    }

    textarea {
        border: 1px solid lightgray;
        width: 450px;
        resize: none;
        line-height: 30px;
        border-radius: 5px;
        font-size: 25px;
        padding: 5px 10px;

    }
`

const Visibility = styled.div `
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 450px;
    margin-bottom: 30px;

    h3 {
        font-size: 30px;
        font-weight: 300;

    }
`

const RadioButtons = styled.div `
    margin-top: 5px;
    margin-left: 5px;
    width: 200px;
    display: flex;
    justify-content: space-between;

    label {
        font-size: 20px;
        color: grey;
    }
`

const Submit = styled.input `
    font-size: 25px;
    font-family: 'Amiri', serif;
    margin-top: 5px;
    border: 1px solid lightgray;
    background-color: #fff;
    height: px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        border: 1px solid #202121;
    }
`



export default CreateCluster; 