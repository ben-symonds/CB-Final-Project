import {  useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import VideoItem from './cluster_items/VideoItem';
import LinkItem from './cluster_items/LinkItem';
import TextItem from './cluster_items/TextItem';
import ImageItem from './cluster_items/ImageItem';


import { UserContext } from '../contexts/UserContext';
import  { ClusterContext } from '../contexts/ClusterContext';
import AddClusterItemModal from './add_cluster/AddClusterItemModal';
import DeleteClusterModal from './DeleteClusterModal';
import VisibilityModal from './VisibilityModal';
import AddTags from '../reusable/AddTags';
import Tag from '../reusable/Tag';

const EditCluster = () => {

    const { user } = useContext(UserContext);

    const { update, setUpdate, openAddClusterItemModal, setOpenAddClusterItemModal  } = useContext(ClusterContext);

    useEffect(() => {
        setOpenAddClusterItemModal(false);
    }, [])

    //grabs cluster id from url 
    const { id } = useParams();
    
    //stores cluster object once retrieved from DB
    const [ cluster, setCluster ] = useState(null);

    //stores boolean depending on whether a fetch request is still loading
    const [ loading, setLoading ] = useState(true);


    //stores boolean depending on open modal
    const [ openDeleteClusterModal, setOpenDeleteClusterModal ] = useState(false);

    //stores a boolean depending on if cluster belongs to current user
    const [ belongsToCurrentUser, setBelongsToCurrentUser ] = useState(false);

    const [ openChangeVisibilityModal, setOpenChangeVisibilityModal ] = useState(false);

    const [ username, setUsername ] = useState(null);

    const [ visibilitySetting, setVisibilitySetting ] = useState(null);

    const [ tags, setTags ] = useState(null); 

    const [ updateTags, setUpdateTags ] = useState(false);

    const [ openEditTags, setOpenEditTags ] = useState(false);

    //determines if cluster belongs to current user
    useEffect(() => {
        if(!loading && user) {
            if(user.uid === cluster.userId) {
                setBelongsToCurrentUser(true);
            }
        }
    }, [loading, user])

    const getUsername = async userId => {
        await fetch(`/get-username/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setUsername(data.data);
                    setLoading(false);
                })
    }

    //retrieves cluster object from DB
    useEffect(() => {
            fetch(`/get-cluster/${id}`)
            .then(res => res.json())
            .then(data => {
                setCluster(data.data);
                setVisibilitySetting(data.data.visibility);
                getUsername(data.data.userId);
                setUpdate(false);
            })
    }, [update])

    useEffect(() => {
        if(tags){
            if(tags.length) {fetch(`/patch-cluster-tags/${id}/${tags}`, {
                method: "PATCH"
            })}else {
                fetch(`/patch-cluster-tags/${id}/${'empty'}`, {
                    method: "PATCH"
                })
            }
        }
            setUpdateTags(false);     
    }, [tags])


    return (
        <Wrapper>
            {loading ?
            <div> loading </div>
            : <ClusterShell>
                <Title> {cluster.title} </Title>
                <Date> Created {cluster.datePublished} by </Date>
                {belongsToCurrentUser ? 
                <span> you. </span>
                :<span> {username}. </span> }
                {belongsToCurrentUser && 
                    <>
                        <button
                            onClick={() => {
                                setOpenChangeVisibilityModal(!openChangeVisibilityModal)
                            }}
                        > 
                            {visibilitySetting} 
                        </button> 

                    </>
                }
                {openChangeVisibilityModal && <VisibilityModal visibility={visibilitySetting} setVisibilitySetting={setVisibilitySetting} setOpenChangeVisibilityModal={setOpenChangeVisibilityModal} />}
                {cluster.description && <Description> {cluster.description} </Description>}
                {belongsToCurrentUser && 
                    <button
                        onClick={() => {
                            setOpenEditTags(!openEditTags);
                        }}
                    > 
                        edit tags 
                    </button>
                }
                {openEditTags ?
                    <> <AddTags tags={cluster.tags} setTags={setTags} setUpdateTags={setUpdateTags} /> </>
                    :<>{ 
                        cluster.tags.length > 0 && 
                            cluster.tags.map((tag) => {
                                return <Tag key={tag} tagName={tag} />
                        })
                    }</>
                }   
                <Divider />
                 {/* {if cluster belongs to user allow option to edit } */}
                 {belongsToCurrentUser && 
                    <ButtonWrapper>
                        
                        <EditButton 
                            onClick={()=> { 
                                setOpenAddClusterItemModal(!openAddClusterItemModal);
                                setOpenDeleteClusterModal(false);
                            }}
                            style={
                                openAddClusterItemModal ? 
                                    {backgroundColor: '#000',
                                    color: '#fff'}
                                    :{backgroundColor: '#fff',
                                    color: '#000'}
                            }
                        >  
                            + add to cluster + 
                        </EditButton>
                        {openAddClusterItemModal && <AddClusterItemModal setUpdate={setUpdate} setOpenAddClusterItemModal={setOpenAddClusterItemModal} />}
                        <EditButton 
                            onClick={() =>{
                                setOpenDeleteClusterModal(!openDeleteClusterModal);
                                setOpenAddClusterItemModal(false);
                            }} 
                            style={
                                openDeleteClusterModal ? 
                                    {backgroundColor: '#000',
                                    color: '#fff'}
                                    :{backgroundColor: '#fff',
                                    color: '#000'}
                            }
                        >
                            - delete cluster - 
                        </EditButton>
                        {openDeleteClusterModal && <DeleteClusterModal setOpenDeleteClusterModal={setOpenDeleteClusterModal} setUpdate={setUpdate} />}
                    </ButtonWrapper>
                }
                {cluster.items.length > 0 ?
                <>
                    {cluster.items.slice(0).reverse().map((item) => {
                        if(item.type === 'playable media') {
                            return <VideoItem url={item.url} description={item.description} date={item.datePublished} itemId={item.itemId} belongsToCurrentUser={belongsToCurrentUser} key={item.itemId} setUpdate={setUpdate} />
                        } else if(item.type === 'link') {
                            return <LinkItem url={item.url} description={item.description} date={item.datePublished} itemId={item.itemId} belongsToCurrentUser={belongsToCurrentUser} key={item.itemId} setUpdate={setUpdate} name={item.name} />
                        } else if(item.type === 'text') {
                            return <TextItem text={item.text} date={item.datePublished} itemId={item.itemId} belongsToCurrentUser={belongsToCurrentUser} key={item.itemId} setUpdate={setUpdate} /> 
                        } else if(item.type === 'image') {
                            return <ImageItem path={item.path} description={item.description} date={item.datePublished} itemId={item.itemId} belongsToCurrentUser={belongsToCurrentUser} key={item.itemId} setUpdate={setUpdate} /> 
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
`

const ClusterShell = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1 `
    margin: 10px;
    font-size: 40px;
`

const Date = styled.p `
    font-size: 12px;
    color: #444
`

const Description = styled.p `
    margin-top: 10px;
`

const Divider = styled.span `
    width: 550px;
    border-bottom: 2px solid #000;
    margin-top: 10px;
`

const ButtonWrapper = styled.div `
    margin-top: 10px;
    display: flex;
    width: 302px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const EditButton = styled.button `
    width: 550px;
    margin-bottom: 15px;
`
export default EditCluster;