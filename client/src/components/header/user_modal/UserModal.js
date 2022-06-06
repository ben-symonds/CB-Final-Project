import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';
import Logout from './Logout';
import UserInfo from './UserInfo';


const UserModal = ({setOpenUserModal}) => {

    const { user } = useContext(UserContext);

    return (
        <ModalShell>
            <button onClick={() => setOpenUserModal(false)}> X </button>
            <Link to={`/${user.displayName}`}> My Clusters </Link>
            <button> Update My Info </button>
            {/* <UserInfo />  */}
            <Logout />
        </ModalShell>
    )
}

const ModalShell = styled.div `
    display: flex;
    flex-direction: column;
    border: 1px black solid;
    position: absolute;
    top: 50px;

`

export default UserModal;