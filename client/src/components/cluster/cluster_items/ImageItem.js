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
    width: 100%;
    align-items: center;
    border: 1px solid lightgray;
    overflow: hidden;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding-bottom: 15px;
    
    &:hover {
        box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

    }
`

const TopContentWrapper = styled.div  `
    height: 30px;
    background: white;
    width: 100%;
    padding: 0px 20px;
    color: gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledImage = styled(Image) `
    width: 630px;
    margin: 0px 23px 10px 23px;
`

const Date = styled.div `
    font-size: 15px;
`

const Description = styled.div `
    font-size: 15px;    
    display: flex;
    align-items: center;
    overflow: auto;
    max-height: 150px;
    padding: 0px 25px;
`

export default ImageItem;