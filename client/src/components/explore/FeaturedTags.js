import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
        <Wrapper>
            {tagsLoading ? 
            <div>  <LoadingDots /> </div>
            :<>
                    <Tags>  featured tags </Tags>
                    <div>
                        {featuredTags.map(tag => {
                            return (
                            <button style={{background: 'inherit'}} key={tag} onClick={() => handleClick(tag)}> 
                                <Tag key={tag}> {tag} </Tag>
                            </button>
                            )
                        })}
                    </div>
            </>}
        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 500px;
`
const Tags = styled.div `
    color: gray;
    text-align: center;
    font-style: italic;
    font-size: 17px;
    margin-right: 5px;
    margin-bottom: 5px;
    
`

const Tag = styled.span `
    border: 1px solid black;
    font-size: 15px;
    padding: 1px 7px;
    border-radius: 12px;
    font-style: italic;
    margin-right: 5px;

    &:hover {
        color: lightgray;
        border: solid 1px lightgray;
    }
`


export default FeaturedTags;