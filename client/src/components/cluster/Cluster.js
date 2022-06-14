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
import Tag from '../reusable/Tag';
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
                    <VisibilityWrapper> 
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
                        {openChangeVisibilityModal && 
                            <VisibilityModal 
                                visibility={visibilitySetting} 
                                setVisibilitySetting={setVisibilitySetting} 
                                setOpenChangeVisibilityModal={setOpenChangeVisibilityModal} 
                            />
                        }
                    </VisibilityWrapper>

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
                    <TagsWrapper>
                        {openEditTags ?
                            <> <AddTags tags={cluster.tags} setTags={setTags} setUpdateTags={setUpdateTags} /> </>
                            :<>{ 
                                cluster.tags.length > 0 && 
                                    cluster.tags.map((tag) => {
                                        return <Tag key={tag} tagName={tag} />
                                })
                            }</>
                        }
                     </TagsWrapper>
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
                                        {backgroundColor: '#000',
                                        textDecoration: 'none',
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
                                        textDecoration: 'none',
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
    border-bottom: 1px lightgray solid; 
    justify-content: center;
    height: 150px;
    background-color: #fcfbf7;
`

const ClusterItemsWrapper = styled.div `
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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
    margin: 20px 0px 8px 0px;
    font-size: 40px;
`

const DateWrapper = styled.div `
    display: flex;
    align-items: center;
`

const Date = styled.p `
    font-size: 12px;
    margin-right : 5px;
    color: #444
`

const Username = styled(Link) `
    font-size: 12px;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`

const Description = styled.p `
    margin-top: 10px;
`
const TagsWrapper = styled.div `
    margin-top: 10px;
`

const VisibilityWrapper = styled.div`
    display: flex;
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
`

const ClusterItemShell = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 690px;
    margin: 10px;
`
export default EditCluster;