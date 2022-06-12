import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
            setClusterBackground(firstImage.path);
        }
    })

    return (
        <Link to={`/cluster/${clusterId}`}>
            {/* {tags.length > 0 && tags.map(tag => <Tag tagName={tag} key={tag} />)} */}
            <Wrapper> 
                {clusterBackground ? 
                <Image src={clusterBackground}/>
                :<div> {title} </div>
                }
            </Wrapper>
        
        </Link>
    )
}

const Wrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: white;
    height: 240px;
    width: 200px;
    margin: 10px;
    transition: transform .3s;
    border-radius: 4px;

    &:hover {
        transform: scale(1.05);

    }
`

const Image = styled.img `
    max-height: 100%;
    max-width: 100%;
    image-rendering: pixelated;

`
export default SmallCluster;

 // {username && <Link to={`/user/${userId}`}> { username } </Link> }
                // {title}