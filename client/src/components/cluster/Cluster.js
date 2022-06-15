import {  useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import LoadingDots from '../reusable/LoadingDots';

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

    const [ validCluster, setValidCluster ] = useState(false);

    //determines if cluster belongs to current user
    useEffect(() => {
        if(!loading && user && validCluster) {
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
                    setValidCluster(true);
                    setLoading(false);
                })
    }

    //retrieves cluster object from DB
    useEffect(() => {
            fetch(`/get-cluster/${id}`)
            .then(res => res.json())
            .then(data => {
                if(data.message === 'Cluster Not Found'){
                    console.log('nothing here');
                    setLoading(false);
                }else {   
                    setCluster(data.data);
                    setVisibilitySetting(data.data.visibility);
                    getUsername(data.data.userId);
                    setUpdate(false);}
            })
            .catch((error) => {
                console.log(error)
            });
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

    const changeVisibility = async () => {
        await fetch(`/patch-cluster-visibility/${id}/${visibilitySetting === 'public' ? 'private' : 'public'}`, {
            method: "PATCH"
        }) .then(res => res.json())
        .then(data => {
            setVisibilitySetting(visibilitySetting === 'public' ? 'private' : 'public');
        })

        
    }

    return (
        <Wrapper>
            {loading ?
            <div> <LoadingDots /> </div>
            : <>
                {validCluster ? 
                <ClusterShell>
                    <TopContentWrapper>
                        <Title> {cluster.title} </Title>
                        <DateWrapper>
                            <Date> Created {cluster.datePublished} by </Date>
                            {belongsToCurrentUser ? 
                            <Username to={`/user/${cluster.userId}`} > you. </Username>
                            :<Username to={`/user/${cluster.userId}`}> {username}. </Username> }
                        </DateWrapper>
                        {cluster.description && <Description> {cluster.description} </Description>}
                            {belongsToCurrentUser && 
                                <VisibilityWrapper> 
                                    <div style={{fontWeight: '600'}}> {visibilitySetting} </div>
                                    <VisibilityButton
                                        onClick={changeVisibility}
                                    > 
                                        change cluster visibility
                                    </VisibilityButton>
                            
                                </VisibilityWrapper>}
                        <TagsWrapper>
                            {belongsToCurrentUser && 
                                <EditTags
                                    onClick={() => {
                                        setOpenEditTags(!openEditTags);
                                    }}
                                > 
                                    edit tags 
                                </EditTags>
                            }
                            {openEditTags ?
                                <div> <AddTags tags={cluster.tags} setTags={setTags} setUpdateTags={setUpdateTags} /> </div>
                                :<div> { 
                                    cluster.tags.length > 0 && 
                                        cluster.tags.map((tag) => {
                                            return <Tag> {tag} </Tag>
                                    })
                                }</div>
                            }
                        </TagsWrapper>
                        {belongsToCurrentUser && 
                            <DeleteWrapper>
                                <DeleteButton
                                        onClick={() =>{
                                            setOpenDeleteClusterModal(!openDeleteClusterModal);
                                            setOpenAddClusterItemModal(false);
                                        }} 
                                        // style={
                                        //     openDeleteClusterModal ? 
                                        //         {backgroundColor: '#000',
                                        //         textDecoration: 'none',
                                        //         color: '#fff'}
                                        //         :{backgroundColor: '#fff',
                                        //         color: '#000'}
                                        // }
                                    >
                                        delete cluster 
                                    </DeleteButton>
                                {openDeleteClusterModal && <DeleteClusterModal setOpenDeleteClusterModal={setOpenDeleteClusterModal} setUpdate={setUpdate} />}
                            </DeleteWrapper>
                        }    
                    </TopContentWrapper>
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
                                        {backgroundColor: '#202121',
                                        textDecoration: 'none',
                                        color: '#fff'}
                                        :{backgroundColor: '#fff',
                                        color: '#202121'}
                                }
                            >  
                                + add to cluster + 
                            </EditButton>
                            {openAddClusterItemModal && <AddClusterItemModal setUpdate={setUpdate} setOpenAddClusterItemModal={setOpenAddClusterItemModal} />}
                        </ButtonWrapper>
                    }
                    {cluster.items.length > 0 ?
                    <ClusterItemsWrapper> 
                        {cluster.items.slice(0).reverse().map((item) => {
                            if(item.type === 'playable media') {
                                return <ClusterItemShell> 
                                        <VideoItem 
                                            url={item.url} 
                                            description={item.description} 
                                            date={item.datePublished} 
                                            itemId={item.itemId} 
                                            belongsToCurrentUser={belongsToCurrentUser} 
                                            key={item.itemId} 
                                            setUpdate={setUpdate} 
                                        /> 
                                    </ClusterItemShell>
                            } else if(item.type === 'link') {
                                return <ClusterItemShell> 
                                        <LinkItem 
                                            url={item.url} 
                                            description={item.description} 
                                            date={item.datePublished} 
                                            itemId={item.itemId} 
                                            belongsToCurrentUser={belongsToCurrentUser} 
                                            key={item.itemId} setUpdate={setUpdate} 
                                            name={item.name} 
                                        /> 
                                    </ClusterItemShell>
                            } else if(item.type === 'text') {
                                return <ClusterItemShell> 
                                        <TextItem 
                                            text={item.text} 
                                            date={item.datePublished} 
                                            link={item.link}
                                            header={item.header}
                                            itemId={item.itemId} 
                                            belongsToCurrentUser={belongsToCurrentUser}
                                            key={item.itemId} 
                                            setUpdate={setUpdate} 
                                        /> 
                                    </ClusterItemShell>
                            } else if(item.type === 'image') {
                                return <ClusterItemShell>
                                    <ImageItem 
                                        url={item.url} 
                                        description={item.description} 
                                        date={item.datePublished} 
                                        itemId={item.itemId} 
                                        belongsToCurrentUser={belongsToCurrentUser} 
                                        key={item.itemId} 
                                        setUpdate={setUpdate} 
                                    /> 
                                </ClusterItemShell> 
                            }
                        })}
                    </ClusterItemsWrapper>
                    : <EmptyContentWrapper> cluster is empty </EmptyContentWrapper>}
                </ClusterShell>
                :<>
                    <div> there's nothing here </div>
                </>
            }   
            </>
            }

        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    width: 100%;
    justify-content: center;
`

const TopContentWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    border-bottom: 1px solid lightgray;
    box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);
    justify-content: center;
    z-index: 4000;
`

const ClusterItemsWrapper = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
`

const VisibilityButton = styled.button `
    color: #c98ba5;
    font-size: 17px;
    cursor: pointer;
    margin: 0px 5px;

    &:hover {
        lightgray;
    }
`

const ClusterShell = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const EmptyContentWrapper = styled.div `
    margin-top: 30px;
`

const Title = styled.h1 `
    margin: 20px 0px 6px;
    font-style: italic;
    font-size: 55px;
    font-weight: 300;
`

const DateWrapper = styled.div `
    font-size: 12px;
    display: flex;
    align-items: center;


`

const Date = styled.p `
    font-size: 14px;
    margin-right : 5px;
    color: gray;
`

const DeleteButton = styled.button `
    width: 100px;
    
` 

const Username = styled(Link) `
    font-size: 13px;
    font-weight: bold;
    color: #c98ba5;

    &:hover {
        color: lightgray;
    }
`

const Description = styled.p `
    font-size: 23px;
    margin: 10px;
`
const TagsWrapper = styled.div `
    display: flex;
    height: 20px;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
`

const Tag = styled.span `
    border: 1px solid black;
    font-size: 15px;
    padding: 1px 7px;
    border-radius: 12px;
    font-style: italic;
    margin-right: 5px;
`


const VisibilityWrapper = styled.div`
    display: flex;
    align-items: center;
`

const DeleteWrapper = styled.div`
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;

    button {
        &:hover {
            color: lightgray;
        }
    }
`
    


const ButtonWrapper = styled.div `
    display: flex;
    width: 550px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 4;
`

const EditTags = styled.button`
    font-size: 16px;
    color: #c98ba5;
    margin-right: 5px;

    &:hover {
        color: lightgray;
    }
`

const EditButton = styled.button `
    padding: 10px;
    font-size: 20px;
    width: 550px;
`

const ClusterItemShell = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 690px;
    margin: 10px;
`
export default EditCluster;