import {  useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import VideoItem from './cluster_items/VideoItem';
import LinkItem from './cluster_items/LinkItem';
import TextItem from './cluster_items/TextItem'

import { UserContext } from '../contexts/UserContext';
import  { ClusterContext } from '../contexts/ClusterContext';
import AddClusterItemModal from './add_cluster/AddClusterItemModal';
import DeleteClusterModal from './DeleteClusterModal';

const EditCluster = () => {

    const { user } = useContext(UserContext);

    const { update, setUpdate, openAddClusterItemModal, setOpenAddClusterItemModal  } = useContext(ClusterContext);

    //grabs cluster id from url 
    const { id } = useParams();
    
    //stores cluster object once retrieved from DB
    const [ cluster, setCluster ] = useState(null);

    //stores boolean depending on whether a fetch request is still loading
    const [ loading, setLoading ] = useState(true);


    //stores boolean depending on open modal
    const [ openDeleteClusterModal, setOpenDeleteClusterModal ] = useState(false);

    //stores a boolean depending on if cluster belongs to current user
    const [ belongsToCurrentUser, setBelongsToCurrentUser ] = useState(false)

    //determines if cluster belongs to current user
    useEffect(() => {
        if(!loading && user) {
            if(user.uid === cluster.userId) {
                setBelongsToCurrentUser(true);
            }
        }
    }, [loading, user])

    //retrieves cluster object from DB
    useEffect(() => {
            fetch(`/get-cluster/${id}`)
            .then(res => res.json())
            .then(data => {
                setCluster(data.data);
                setLoading(false);
                setUpdate(false);
            })
    }, [update])

    return (
        <Wrapper>
            {loading ?
            <div> loading </div>
            : <ClusterShell>
                {/* {if cluster belongs to user allow option to edit } */}
                {belongsToCurrentUser && 
                    <>
                        
                        <button 
                            onClick={()=> { 
                                setOpenAddClusterItemModal(!openAddClusterItemModal);
                                setOpenDeleteClusterModal(false);
                            }}
                        >  
                            + add to cluster + 
                        </button>
                        {openAddClusterItemModal && <AddClusterItemModal setUpdate={setUpdate} setOpenAddClusterItemModal={setOpenAddClusterItemModal} />}
                        <button 
                            onClick={() =>{
                                setOpenDeleteClusterModal(!openDeleteClusterModal);
                                setOpenAddClusterItemModal(false);
                            }}> 
                            - delete cluster - 
                        </button>
                        {openDeleteClusterModal && <DeleteClusterModal setOpenDeleteClusterModal={setOpenDeleteClusterModal} setUpdate={setUpdate} />}
                    </>
                }
                <p> {cluster.datePublished} </p>
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
                            return <VideoItem url={item.url} description={item.description} date={item.datePublished} itemId={item.itemId} belongsToCurrentUser={belongsToCurrentUser} key={item.itemId} setUpdate={setUpdate} />
                        } else if(item.type === 'link') {
                            return <LinkItem url={item.url} description={item.description} date={item.datePublished} itemId={item.itemId} belongsToCurrentUser={belongsToCurrentUser} key={item.itemId} setUpdate={setUpdate} />
                        } else if(item.type === 'text') {
                            return <TextItem text={item.text} date={item.datePublished} itemId={item.itemId} belongsToCurrentUser={belongsToCurrentUser} key={item.itemId} setUpdate={setUpdate} /> 
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