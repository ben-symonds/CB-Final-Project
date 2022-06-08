import ReactPlayer from 'react-player';
import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const VideoItem = ({url, description, date, itemId, belongsToCurrentUser}) => {
    return (
        <VideoItemShell>
            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
            <div> {date} </div>
            <ReactPlayer url={url} />
            <div> { description } </div>
        </VideoItemShell>
    )
}

const VideoItemShell = styled.div `
    margin: 5px;
    border: 1px black solid;
`
export default VideoItem;