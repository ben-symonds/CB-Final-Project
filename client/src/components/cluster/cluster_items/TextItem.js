import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const TextItem = ({text, date, itemId, belongsToCurrentUser, link, header}) => {
    return (
        <TextItemShell>
            <TopContentWrapper> 
                {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
                <Date> {date} </Date>
            </TopContentWrapper>
            <Body> 
                {header && <h1> {header} </h1>}
                <p style={{whiteSpace: 'pre-wrap'}}> {text} </p>
                {link &&  
                    <>
                        <h3> Source </h3>
                        <a href={link} target='_blank'> {link} </a> 
                    </>
                }
            </Body> 
        </TextItemShell>
    )
}

const TextItemShell = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 400px;  
    border: 1px solid lightgray;
    border-radius: 10px;
    padding-bottom: 20px;
    
    p{
        font-family: 'Assistant', sans-serif;
        line-height: 18px;
        color: black;
        margin-bottom: 15px;
    }

    &:hover {
        box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

    }

    h3 {
        font-size: 17px;
    }
`

const TopContentWrapper = styled.div  `
    height: 34px;
    background: white;
    width: 100%;
    font-size: 13px;
    padding: 0px 10px;
    color: gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
`

const Body = styled.div `
    overflow: auto;
    padding: 0px 25px;

    p {
        margin-top: 15px;
        line-height: 18px;
    }

    h1{ 
        margin-top: 15px;
        font-size: 20px;
        text-align: center;
    }

    a{
        font-size: 15px;
        color: #B862CB;

        &:hover{
            color: darkgray;
        }
    }

`

const Date = styled.div `

`

export default TextItem;  