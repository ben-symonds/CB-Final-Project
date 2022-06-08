import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

import { auth } from '../../../firebase-config';

const Logout = ({setOpenUserModal}) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        setOpenUserModal(false);
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