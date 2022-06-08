import ReactPlayer from 'react-player';
import styled from 'styled-components';

const VideoItem = ({url, description, date, id}) => {
    return (
        <VideoItemShell>
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