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

    useEffect(()=> {
        if(user.uid === id) {
            fetch(`/get-user-clusters/${id}`)
            .then(res => res.json())
            .then(data => {
                setClusters(data.data);
                console.log(data.data)
                setLoading(false);
            })
        }
    }, [user])
    
    return (
        <Wrapper>
            {loading ?
            <div> loading </div> 
            :<>
                <Link to='/create'> + </Link>
                {clusters.map((cluster) => {
                    return <SmallCluster clusterId={cluster.clusterId} title={cluster.title}/>
                })}
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


export default Profile;