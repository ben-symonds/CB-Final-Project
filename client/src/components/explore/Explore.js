import { useEffect, useState } from 'react';
import styled from 'styled-components';

import SmallCluster from '../reusable/SmallCluster';
import SearchBar from '../reusable/SearchBar';
import FeaturedTags from './FeaturedTags';
import LoadingDots from '../reusable/LoadingDots';

const Explore = () => {

    const [ clusters, setClusters ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ currentTag, setCurrentTag ] = useState(null); 
    const [ refresh, setRefresh ] = useState(false);

    const [ noMatchMessage, setNoMatchMessage ] = useState(null);

    useEffect(() => {
        fetch(`/get-public-clusters`)
        .then(res => res.json())
        .then(data => {
            setNoMatchMessage(null);
            setClusters(data.data);
            console.log(data.data);
            setRefresh(false);
            setLoading(false);
        })
    }, [refresh]) 

    return (
        <Wrapper>
            {loading ?
            <div> <LoadingDots /> </div> 
            :<>
                <TopContentWrapper>
                    <SearchBar setClusters={setClusters} setLoading={setLoading} setCurrentTag={setCurrentTag} setNoMatchMessage={setNoMatchMessage} />
                    <FeaturedTags setClusters={setClusters} setLoading={setLoading} setCurrentTag={setCurrentTag} setNoMatchMessage={setNoMatchMessage}/>
                    <button
                        onClick={() => {
                            setRefresh(true);
                    }}
                    > 
                        View All
                    </button> 
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
justify-content: center;
align-items: center;
flex-wrap: wrap;
`
export default Explore;