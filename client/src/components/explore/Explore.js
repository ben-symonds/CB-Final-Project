import { useEffect, useState } from 'react';

import SmallCluster from '../reusable/SmallCluster';
import SearchBar from '../reusable/SearchBar';
import FeaturedTags from './FeaturedTags';

const Explore = () => {

    const [ clusters, setClusters ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ currentTag, setCurrentTag ] = useState(null); 

    const [ noMatchMessage, setNoMatchMessage ] = useState('');

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
        <div>
            {loading ?
            <div> loading </div> 
            :<>
                <div> 
                    <SearchBar setClusters={setClusters} setLoading={setLoading} setCurrentTag={setCurrentTag} setNoMatchMessage={setNoMatchMessage} />
                </div>
                <FeaturedTags setClusters={setClusters} setLoading={setLoading} setCurrentTag={setCurrentTag}/>
                {currentTag && <div> {currentTag} </div>}
                {clusters.map((cluster) => {
                    return <SmallCluster clusterId={cluster.clusterId} title={cluster.title} key={cluster.clusterId} tags={cluster.tags}/>
                })}
                {noMatchMessage && <div> {noMatchMessage} </div>}
                
            </>
            }
        </div>
    )
}

export default Explore;