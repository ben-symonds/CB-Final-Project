import { useState, useEffect } from 'react';

import Tag from '../reusable/Tag';
import LoadingDots from '../reusable/LoadingDots';

const FeaturedTags = ({setClusters, setLoading, setCurrentTag, setNoMatchMessage}) => {

    const [ featuredTags, setFeaturedTags ] = useState(null);
    const [ tagsLoading, setTagsLoading ] = useState(true);

    useEffect(() => {
        fetch(`/get-featured-tags`)
        .then(res => res.json())
        .then(data => {
            setFeaturedTags(data.data);
            setTagsLoading(false);
        })
    }, []) 

    const handleClick = tag => {

        setLoading(true);

        setNoMatchMessage(null);

        fetch(`/get-public-clusters/${tag}`)
            .then(res => res.json())
            .then(data => {
                setClusters(data.data);
                setCurrentTag(tag);
                setLoading(false);
            })
    }

    return(
        <>
            {tagsLoading ? 
            <div>  <LoadingDots /> </div>
            :<div>  featured tags: 
                {featuredTags.map(tag => {
                    return (
                    <button key={tag} onClick={() => handleClick(tag)}> 
                        <Tag key={tag} tagName={tag} />
                    </button>
                    )
                })}
            </div>}
            
        </>
    )
}

export default FeaturedTags;