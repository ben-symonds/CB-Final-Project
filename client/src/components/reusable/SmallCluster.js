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
    }, [])

    return (
        <Wrapper>
            <TopContentWrapper> 
                {clusterBackground &&
                    <>
                        <div className='title-num-items-wrapper'> 
                            <div> <TitleLink to={`/cluster/${clusterId}`}> {title} </TitleLink>  </div>  
                            {items.length > 0 && <NumItems> <span> {items.length} </span> items  </NumItems>} 
                        </div>  
                        {explore && 
                            <span style={{color: 'gray'}}> created by <UserLink to={`/user/${userId}`}> {username} </UserLink>  </span>
                        }
                    </>
                }
            </TopContentWrapper>
            <Link to={`/cluster/${clusterId}`}>
                {/* */}
                <ContentWrapper> 
                    {clusterBackground ? 
                    <> 
                        <Image style={{ minWidth: '250px'}} cloudName={'desecho'} publicId={clusterBackground} />
                    </>
                    :<ClusterFiller>  
                        <div className='title-num-items-wrapper'> 
                            <div> <TitleLink to={`/cluster/${clusterId}`}> {title} </TitleLink>  </div>  
                            {items.length > 0 && 
                            <div> 
                                <span> {items.length} </span> items  
                            </div>} 
                        </div>  
                        {explore && 
                            <span style={{color: 'gray'}}> created by <UserLink to={`/user/${userId}`}> {username} </UserLink>  </span>
                        }
                    </ClusterFiller>
                    }
                </ContentWrapper>
            </Link>
            <TagsWrapper>  
                {tags.length > 0 && tags.map(tag => <SmallTag key={tag}> {tag} </SmallTag>  )} 
            </TagsWrapper>
        </Wrapper>
    )
}

const NumItems = styled.span `
    font-size: 13px;
    margin-left: 10px;
    color: gray;

    span {

        font-weight: bold;
        font-size: 15px;
    }

`

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    margin-left: 15px;
    margin-right: 15px;
    transition: transform .3s;

    &:hover {
        transform: scale(1.05);
    }
`
const ClusterFiller = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;

`

const TopContentWrapper = styled.div `
    height: 33px;
    div {
        font-size: 11px;
        font-style: italic;
    }

    .title-num-items-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
`

const TitleLink = styled(Link) `
    font-size: 17px;
    &:hover{ 
        color: lightgray;
    }
`

const UserLink = styled(Link) `
    font-size: 13px;
    color: #c98ba5;
    font-weight: bold;

    &:hover {
        color: lightgray;
    }
`

const ContentWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid lightgray;
    overflow: hidden;
    height: 310px;
    width: 250px;
    border-radius: 4px;

    &:hover {
        box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

    }

`

const TagsWrapper = styled.div `
    margin-top: 3px;
    display: flex;
    height: 60px;
    justify-content: center;
    
    flex-wrap: wrap;
`

const SmallTag = styled.span `
    padding: 2px 3px;
    margin: 3px;
    height: 15px;
    font-size: 12px;
    border: 1px solid black;
    border-radius: 5px;
`

export default SmallCluster;

 // {username && <Link to={`/user/${userId}`}> { username } </Link> }
                // {title}