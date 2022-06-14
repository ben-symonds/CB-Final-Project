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
            <StyledImage 
                cloudName={'desecho'}
                publicId={url}
            />
            <Description > { description } </ Description>
        </ImageItemShell>
    )
}

const ImageItemShell = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid lightgray;
    overflow: hidden;
    border: 1px solid lightgray;
    border-radius: 10px;
`

const TopContentWrapper = styled.div  `
    height: 30px;
    background: white;
    width: 100%;
    font-size: 13px;
    padding: 0px 10px;
    color: gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledImage = styled(Image) `
    max-height: 600px;
    min-height: 400px;
    margin: 0px 23px;
`

const Date = styled.div `
    font-size: 15px;
`

const Description = styled.div `
    font-size: 13px;
    display: flex;
    align-items: center;
    min-height: 30px;
`

export default ImageItem;