import styled from 'styled-components';
import { Image } from 'cloudinary-react';
import DeleteClusterItem from './DeleteClusterItem'

const ImageItem = ({url, description, date, itemId, belongsToCurrentUser}) => {
    return (
        <ImageItemShell>
            <TopContentWrapper> 
                {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
                <Date> {date} </Date>
            </TopContentWrapper>
            <Image 
                cloudName={'desecho'}
                publicId={url}
            />
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