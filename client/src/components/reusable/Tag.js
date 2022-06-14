import styled from 'styled-components';

const Tag = ({tagName}) => {
    return (
        <> 
            <StyledSpan> { tagName } </StyledSpan>
        </>
    )
}

const StyledSpan = styled.span `
    text-align: center;
    padding: 3px 5px;
    margin-left: 5px;
    border-radius: 8px;
    border: 1px solid gray;

    &:hover {
        background-color: lightgray;
        cursor: pointer;
    }


`

export default Tag;