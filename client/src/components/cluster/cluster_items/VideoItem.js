import { useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const VideoItem = ({url, description, date, itemId, belongsToCurrentUser}) => {

    const [ hover, setHover ] = useState(false);

    return (
        <VideoItemShell
            onMouseOver={() => {
                setHover(true);
            }}
            onMouseOut={() => {
                setHover(false)
            }}
        >
            <HoverContentWrapper> 
                        <HoverContentFlexWrapper>
                            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
                            <div> {date} </div>
                        </HoverContentFlexWrapper>  
            </HoverContentWrapper>
            <ReactPlayer controls={true} url={url} />
            <Description> { description } </Description>
        </VideoItemShell>
    )
}

const VideoItemShell = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 400px;
    padding: 0px 10px;
    border: 1px solid lightgray;
    border-radius: 10px;

    &:hover {
        box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

    }
        
`

const HoverContentWrapper = styled.div `
    height: 30px;
    width: 100%;
    font-size: 13px;
    padding: 0px 10px;
    color: gray;
    
`

const HoverContentFlexWrapper = styled.div `
    width: 100%;
    height: 100%;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Description = styled.div `
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 15px;
    display: flex;
    align-items: center;
    min-height: 20px;
    overflow: auto;
    padding: 0px 25px;
    max-height: 250px;

`
export default VideoItem;