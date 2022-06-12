import { useEffect, useState } from 'react';
import styled from 'styled-components';

import SmallCluster from '../reusable/SmallCluster';
import SearchBar from '../reusable/SearchBar';
import FeaturedTags from './FeaturedTags';

const Explore = () => {

    const [ clusters, setClusters ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ currentTag, setCurrentTag ] = useState(null); 

    const [ noMatchMessage, setNoMatchMessage ] = useState(null);

    useEffect(() => {
        fetch(`/get-public-clusters`)
        .then(res => res.json())
        .then(data => {
            setClusters(data.data);
            console.log(data.data);
            setLoading(false);
        })
    }, []) 

    return (
        <Wrapper>
            {loading ?
            <div> loading </div> 
            :<>
                <TopContentWrapper>
                    <SearchBar setClusters={setClusters} setLoading={setLoading} setCurrentTag={setCurrentTag} setNoMatchMessage={setNoMatchMessage} />
                    <FeaturedTags setClusters={setClusters} setLoading={setLoading} setCurrentTag={setCurrentTag} setNoMatchMessage={setNoMatchMessage}/>
                    {currentTag && <TagDisplay> Public Clusters Tagged <span> {currentTag}  </span> </TagDisplay>}
                </TopContentWrapper>
                <ClusterWrapper> 
                    {clusters.map((cluster) => {
                        return <SmallCluster 
                            userId={cluster.userId} 
                            items={cluster.items} 
                            clusterId={cluster.clusterId} 
                            title={cluster.title} 
                            key={cluster.clusterId} 
                            explore={true} 
                            tags={cluster.tags}
                        />
                    })}
                </ClusterWrapper>
                {noMatchMessage && <div> {noMatchMessage} </div>}
                
            </>
            }
        </Wrapper>
    )
}


const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center; 


`
const TopContentWrapper = styled.div `
display: flex;
flex-direction: column;
align-items: center;

`

const TagDisplay = styled.span `
    font-size: 20px;
    margin-top: 20px;
    span {
        font-weight: bold;
        font-size: 20px;
    }
`


const ClusterWrapper = styled.div `
display: flex;
width: 100vw;
margin-top: 30px;
justify-content: space-evenly;
align-items: center;
flex-wrap: wrap;
`
export default Explore;