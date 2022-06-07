import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

import { auth } from '../../../firebase-config';

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');

    }

    return (
        <StyledButton onClick={handleLogout}>
            sign out
        </StyledButton>
    )
}

const StyledButton = styled.button `
    margin: 3px 0px;
    width: 65px;
`

export default Logout;