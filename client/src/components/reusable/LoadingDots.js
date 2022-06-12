import styled from 'styled-components';

const LoadingDots = () => {

    return (
        <>
            <StyledImage src='/Ellipsis-1s-200px.svg' />
        </>
    )
}

const StyledImage = styled.img `
    width: 50px;
`

export default  LoadingDots;