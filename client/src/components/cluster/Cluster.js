import {  useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import VideoItem from './cluster_items/VideoItem';
import LinkItem from './cluster_items/LinkItem';
import TextItem from './cluster_items/TextItem'

import { UserContext } from '../contexts/UserContext';
import AddClusterItemModal from './add_cluster/AddClusterItemModal';

const EditCluster = () => {

    const { user } = useContext(UserContext);

    //grabs cluster id from url 
    const { id } = useParams();
    
    //stores cluster object once retrieved from DB
    const [ cluster, setCluster ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    //stores boolean depending on open modal
    const [ openAddClusterItemModal, setOpenAddClusterItemModal ] = useState(false);

    //retrieves cluster object from DB
    useEffect(() => {
        fetch(`/get-cluster/${id}`)
        .then(res => res.json())
        .then(data => {
            setCluster(data.data);
            console.log(data.data)
            setLoading(false);
        })
    }, [])

    return (
        <Wrapper>
            {loading && user ?
            <div> loading </div>
            :<ClusterShell>
                {/* {if cluster belongs to user allow option to edit } */}
                {user.uid === cluster.userId && 
                    <>
                        <button 
                            onClick={()=> { 
                                setOpenAddClusterItemModal(!openAddClusterItemModal);
                            }}
                        >  
                            + add to cluster + 
                        </button>
                        {openAddClusterItemModal && <AddClusterItemModal />}
                    </>
                }
                <h1> {cluster.title} </h1>
                {cluster.description && <p> {cluster.description} </p>}
                {cluster.tags.length > 0 && 
                    cluster.tags.map((tag) => {
                        <div> {tag} </div>
                    })
                }
                {cluster.items.length > 0 ?
                <>
                    {cluster.items.map((item) => {
                        if(item.type === 'playable media') {
                            return <VideoItem url={item.url} description={item.description} date={item.datePublished} id={item.itemId}/>
                        } else if(item.type === 'link') {
                            return <LinkItem url={item.url} description={item.description} date={item.datePublished} id={item.itemId} />
                        } else if(item.type === 'text') {
                            return <TextItem text={item.text} date={item.datePublished} id={item.itemId} /> 
                        }
                    })}
                </>
                : <div> cluster is empty </div>}
            </ClusterShell>

            }

        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    justify-content: center;

    button {
        margin: 5px;
    }
`

const ClusterShell = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    
    div {
        padding: 20px;
    }

`

export default EditCluster;