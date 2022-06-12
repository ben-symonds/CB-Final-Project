import { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import SmallCluster from '../reusable/SmallCluster';

import { UserContext } from '../contexts/UserContext';

const Profile = () => {
    
    const { user } = useContext(UserContext);

    const { id } = useParams();

    const [ clusters, setClusters ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ currentUserProfile, setCurrentUserProfile ] = useState(false);
    const [ userDisplayMsg, setUserDisplayMsg ] = useState(null);

    const retrieveCurrentUserProfile = () => {

        setCurrentUserProfile(true);

        fetch(`/get-user-clusters/${id}`)
                .then(res => res.json())
                .then(data => {
                    setClusters(data.data);
                    setLoading(false);
                })

    }

    const retrievePublicUserProfile = async () => {

        setCurrentUserProfile(false);

        try {
            fetch(`/get-username/${id}`)
                .then(res => res.json())
                .then(data => {
                    setUserDisplayMsg(`${data.data}'s Public Clusters`);
                })
        } catch(error){
            console.log(error.stack)
        }

        try {
            fetch(`/get-public-user-clusters/${id}`)
            .then(res => res.json())
            .then(data => {
                setClusters(data.data);
                setLoading(false);
        })  
        } catch(error){
            console.log(error.stack)
        }
    }

    useEffect(() => {
        user ? 
        user.uid === id ?
        retrieveCurrentUserProfile()
        :retrievePublicUserProfile()
        :retrievePublicUserProfile()
    }, [user])
    
    return (
        <Wrapper>
            {loading ?
            <div> loading </div> 
            :<>
                {currentUserProfile ? 
                <div> Your Clusters </div>
                :<div> { userDisplayMsg } </div>}
                {currentUserProfile  && <Link to='/create'> + Create New Cluster + </Link>}
                <ClusterWrapper> 
                    {clusters.map((cluster) => {
                        return <SmallCluster items={cluster.items} clusterId={cluster.clusterId} title={cluster.title} key={cluster.clusterId} tags={cluster.tags}/>
                    })}
                </ClusterWrapper>
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
        ma
    }
`

const ClusterWrapper = styled.div `
    margin-top: 30px;
    display: flex;
    width: 100vw;
    margin-top: 30px;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
`

export default Profile;