import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const LinkItem = ({url, description, date, itemId, belongsToCurrentUser, name}) => {
    return (
        <LinkItemShell>
            <TopContentWrapper>
                {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
                <div> {date} </div>
            </TopContentWrapper>
            <MainContentWrapper>
                {name ? 
                <Link> 
                    <span> Link: </span> 
                    <a href={url} target='_blank'> {name} </a> 
                </Link>
                :<a href={url} target='_blank'>  {url} </a> } 
                {description && <Description> <p style={{whiteSpace: 'pre-wrap'}}> { description }  </p> </Description>}
            </MainContentWrapper>
        </LinkItemShell>
    )
}

const LinkItemShell = styled.div `
    border: 1px black solid;
    line-height: 18px;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 10px;


    &:hover {
        box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

    }

    p {
        margin-top: 15px;
        line-height: 20px;
    }
`

const Description = styled.div `
    display: flex;
    justify-content: center;
    width: 100%;
`

const TopContentWrapper = styled.div  `
    height: 34px;
    background: white;
    width: 100%;
    font-size: 15px;
    padding: 8px 20px;
    color: gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
`

const MainContentWrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-bottom: 10px;

    p {
        width: 630px;
    }

    a {
        color: gray;

        &:hover {
            text-decoration: underline;
        }
    }
`

const Link = styled.div `
    display: flex;
    align-items: center;
    height: 20px;
    
    span {
        margin-right: 5px;
        font-weight: 600;
    }
`
export default LinkItem