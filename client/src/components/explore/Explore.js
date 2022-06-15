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

                    <ViewAllButton
                            onClick={() => {
                                setRefresh(true);
                                setCurrentTag(null);
                        }}
                        > 
                            View All
                    </ViewAllButton> 
                </TopContentWrapper>
                {currentTag && <TagDisplay> Public Clusters Tagged <span> {currentTag}  </span> </TagDisplay>}
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
                {noMatchMessage && 
                    <NoMatch> No public clusters were found with the tag <span style={{fontWeight: 'bold'}}> {noMatchMessage} </span>  </NoMatch>}
                
            </>
            }
        </Wrapper>
    )
}


const Wrapper = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
`

const TopContentWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid lightgray;
    box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

`

const ViewAllButton = styled.button `
    color: #c98ba5;
    font-style: italic;
    font-size: 17px;
    margin-bottom: 10px;

    &:hover {
        color: lightgray;
    }
`

const TagDisplay = styled.span `
    font-size: 20px;
    margin-top: 20px;
    span {
        font-weight: bold;
        font-size: 20px;
    }
`

const NoMatch = styled.div `
    font-size: 30px;
    margin-top: 20px;
    color: gray;
    span {
        font-weight: bold;
        font-size: 30px;
        color: gray;
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