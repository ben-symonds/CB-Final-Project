import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';
import UserModalButtons from '../reusable/UserModalButtons';

const Landing = () => {

    const navigate = useNavigate();
    
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(user) {
            navigate(`/user/${user.uid}`);
        }
    }, [user])

    return (
        <Wrapper>
            <ImageWrapper> 
                <img src='/images/background.png'/> 
            </ImageWrapper>
            <Logo> Cluster </Logo>
            <Divider/>
            <Info> CLUSTER is a barebones visual booking-marking and archiving tool. Store and organize images, videos and text with labelled collections called 'clusters'. Share your clusters with others or keep them private. It's up to you. </Info>
            <UserModalButtons page='landing' />
            {  user?.email } 
        </Wrapper>
    )
}

const Wrapper = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    

    img {
        width: 1110px;

    }
`

const ImageWrapper = styled.div `
    height: 500px;
    overflow: hidden;
`

const Logo = styled.div ` 
    font-size: 100px;
`

const Info = styled.div `
    font-size: 20px;
    width: 800px;
    margin-top: 20px;
`
const Divider = styled.div `
    height: 10px;
    width: 1100px;
    border-bottom: 1px solid black;
`

export default Landing;