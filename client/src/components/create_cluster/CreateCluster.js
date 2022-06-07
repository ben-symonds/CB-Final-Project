import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//uuid is used to assign a unique id to the cluster
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';

const CreateCluster = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    //state variables storing form data
    const [ title, setTitle ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ publicCluster, setPublicCluster ] = useState(true);
    const [ privateCluster, setPrivateCluster ] = useState(false);

    const handleSubmit = async e => {

        e.preventDefault();
        //creates a  cluster object skeleton with some identifiers
        const newCluster = {
            description: description,
            userId: user.uid,
            clusterId: uuidv4(),
            items: [],
            tags:[],
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
        navigate(`/edit/${newCluster.clusterId}`)

    }

    return ( 
        <FormShell>
            <h3> new cluster </h3>

            <form onSubmit={handleSubmit}> 
                <div> 
                    <label htmlFor='title'> title </label>
                    <input 
                        type='text' 
                        className='title' 
                        required
                        onChange={e => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <TextAreaWrapper> 
                    <label htmlFor='description'> description </label>
                    <textarea 
                        className='description'
                        onChange={e => {
                            setDescription(e.target.value);
                        }}
                    />
                </TextAreaWrapper>
                <div>
                    <p>  </p>
                    <label htmlFor='public'> public </label>
                    <input 
                        type='radio' 
                        value='public' 
                        name='public' 
                        className='public' 
                        defaultChecked
                        onChange={() => {
                            setPublicCluster(!publicCluster);
                            setPrivateCluster(!privateCluster);
                        }}
                    />
                    <label htmlFor='private'> private </label>
                    <input 
                        type='radio' 
                        value='private' 
                        name='public' 
                        className='private'
                        onChange={() => {
                            setPublicCluster(!publicCluster);
                            setPrivateCluster(!privateCluster);
                        }}
                    />
                </div>
                <input type='submit' value='create cluster' />
            </form>
        </FormShell>
    )
}

const FormShell = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        border: 1px black solid;
        padding: 10px;
    }
    input {

        margin: 15px;
    }

    textarea {
        margin-left: 20px;
        width: 400px;
    }
`

const TextAreaWrapper = styled.div `
    display: flex;
    align-items: center;
`

export default CreateCluster; 