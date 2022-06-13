import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Image } from 'cloudinary-react';

import Tag from './Tag';

const SmallCluster = ({clusterId, title, tags, explore, userId, items, setLoading }) => {

    const [ username, setUsername ] = useState(null);
    const [ clusterBackground, setClusterBackground ] = useState(null);

    
    useEffect(() => {

        if(explore) {
            fetch(`/get-username/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUsername(data.data);
            })
        }

    }, [])
    
    useEffect(() => {
        const firstImage = items.slice(0).reverse().find((item) => item.type === 'image')
        if(firstImage) {
            setClusterBackground(firstImage.url);
        }
    })

    return (
        <Wrapper>
            <TopContentWrapper> 
                <div className='title-num-items-wrapper'> 
                    <div> <TitleLink to={`/cluster/${clusterId}`}> {title} </TitleLink>  </div>  
                    {items.length > 0 && <span> {items.length} items  </span>} 
                </div>  
                {explore && <span> created by <UserLink to={`/user/${userId}`}> {username} </UserLink>  </span>}
            </TopContentWrapper>
            <Link to={`/cluster/${clusterId}`}>
                {/* */}
                <ContentWrapper> 
                    {clusterBackground ? 
                    <> 
                    <Image cloudName={'desecho'} publicId={clusterBackground} />
                    </>
                    :<div> {title} </div>
                    }
                </ContentWrapper>
            </Link>
            <TagsWrapper>  
                {tags.length > 0 && tags.map(tag => <SmallTag key={tag}> {tag} </SmallTag>  )} 
            </TagsWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    margin-left: 15px;
    margin-right: 15px;
    transition: transform .3s;

    &:hover {
        transform: scale(1.05);

    }
`

const TopContentWrapper = styled.div `
    div {
        font-size: 11px;
        font-style: italic;
    }

    span{
        font-size: 12px;
    }

    .title-num-items-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
`

const TitleLink = styled(Link) `
    font-size: 12px;
    &:hover{ 
        text-decoration: underline;
    }
`

const UserLink = styled(Link) `
    font-size: 13px;
    color: purple;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`

const ContentWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid gray;
    background-color: white;
    height: 240px;
    width: 200px;
    border-radius: 4px;

`

const TagsWrapper = styled.div `
    margin-top: 3px;
    display: flex;
    height: 60px;
    justify-content: center;
    
    flex-wrap: wrap;
`

const SmallTag = styled.span `
    padding: 1px 2px;
    margin: 3px;
    height: 15px;
    font-size: 11px;
    border: 1px solid black;
    border-radius: 5px;
`

export default SmallCluster;

 // {username && <Link to={`/user/${userId}`}> { username } </Link> }
                // {title}