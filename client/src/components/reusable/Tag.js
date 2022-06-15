import styled from 'styled-components';

const Tag = ({tagName}) => {
    return (

            <StyledSpan> { tagName } </StyledSpan>
    )
}

const StyledSpan = styled.span `
    border: 1px solid black;
    font-size: 12px;
    padding: 3px 5px;
    border-radius: 12px;
    margin-right: 5px;

    &:hover {
        background-color: lightgray;
        cursor: pointer;
    }
`


export default Tag;