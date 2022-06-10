import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const ImageItem = ({path, description, date, itemId, belongsToCurrentUser}) => {
    return (
        <ImageItemShell>
            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
            <div> {date} </div>
            {description && <div> { description } </div>}
            <img src={path} />
        </ImageItemShell>
    )
}

const ImageItemShell = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px black solid;
    height: 400px;
    width: 400px;

    img {
        max-width: 100%;
        max-height: 100%;
    }
`

export default ImageItem;