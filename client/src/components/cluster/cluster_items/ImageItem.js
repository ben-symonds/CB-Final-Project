import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const ImageItem = ({path, description, date, itemId, belongsToCurrentUser}) => {
    return (
        <ImageItemShell>
            <TopContentWrapper> 
                {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
                <Date> {date} </Date>
            </TopContentWrapper>
            <img src={path} />
            {description && <div> { description } </div>}
        </ImageItemShell>
    )
}

const ImageItemShell = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 98%;

    img {
        max-width: 100%;
        max-height: 700px;
        min-width: 300px;
        min-height: 300px;
    }
`

const TopContentWrapper = styled.div  `
    display: flex;

    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
`

const Date = styled.div `
    font-size: 15px;
`

export default ImageItem;