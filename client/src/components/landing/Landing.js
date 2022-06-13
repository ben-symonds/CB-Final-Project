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
                <img src='/images/image.webp'/> 
            </ImageWrapper>
            <div> Logo </div>
            <div> Something about the site </div>
            <UserModalButtons page='landing' />
            <div> Browse Public Clusters </div>
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
        width: 100%;
    }
`

const ImageWrapper = styled.div `
    height: 400px;
    overflow: hidden;
`

export default Landing;