import { useState, useEffect } from 'react';

import Tag from '../reusable/Tag';

const FeaturedTags = ({setClusters, setLoading, setCurrentTag}) => {

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
            <div> loading </div>
            :<div>  
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