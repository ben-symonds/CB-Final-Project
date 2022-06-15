import { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import SmallCluster from '../reusable/SmallCluster';
import LoadingDots from '../reusable/LoadingDots';

import { UserContext } from '../contexts/UserContext';

const Profile = () => {
    
    const { user } = useContext(UserContext);

    const { id } = useParams();

    const [ clusters, setClusters ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ currentUserProfile, setCurrentUserProfile ] = useState(false);
    const [ username, setUsername ] = useState(null);
    const [ validUser, setValidUser ] = useState(false);

    const retrieveCurrentUserProfile = () => {

        setCurrentUserProfile(true);

        fetch(`/get-user-clusters/${id}`)
                .then(res => res.json())
                .then(data => {
                    setClusters(data.data);
                    setValidUser(true);
                    setLoading(false);
                })

    }

    const retrievePublicUserProfile = async () => {

        setCurrentUserProfile(false);

        
            fetch(`/get-username/${id}`)
                .then(res => res.json())
                .then(data => {
                    setUsername(data.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error.stack)
                })

            fetch(`/get-public-user-clusters/${id}`)
            .then(res => res.json())
            .then(data => {
                if(data.message === 'User does not exist') {
                    console.log('invalid user');
                } else{
                    setValidUser(true);
                    setClusters(data.data);
                }
            })  
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        user ? 
        user.uid === id ?
        retrieveCurrentUserProfile()
        :retrievePublicUserProfile()
        :retrievePublicUserProfile()
    }, [user, id ])
    
    return (
        <Wrapper>
            {loading ?
            <div> <LoadingDots /> </div> 
            :<>
                {validUser ?
                    <>
                        {currentUserProfile ? 
                                        <DisplayMsg> Your Clusters </DisplayMsg>
                                        :<DisplayMsg> <span>{username}</span>'s Public Clusters </DisplayMsg>}
                                        {currentUserProfile  && <StyledLink to='/create'> + Create New Cluster + </StyledLink>}
                                        <ClusterWrapper> 
                                            {clusters.map((cluster) => {
                                                return <SmallCluster items={cluster.items} clusterId={cluster.clusterId} title={cluster.title} key={cluster.clusterId} tags={cluster.tags}/>
                                            })}
                                        </ClusterWrapper>
                    </>
                    :<>
                        <div> theres nothing here </div>
                    </>
                }
            </>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;

    input {
        height: 20px;
        width: 200px;
        margin-top: 20px;
    }
`

const DisplayMsg = styled.div `

    margin-top: 20px;
    font-size: 30px;
    span {
        font-size: 30px;
        font-weight: 600;
    }
`

const ClusterWrapper = styled.div `
    margin-top: 30px;
    display: flex;
    width: 100vw;
    margin-top: 30px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const StyledLink = styled(Link)`
    color: #c98ba5;
    font-size: 23px;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
        color: lightgray;
    }

`

export default Profile;