import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';
import Logout from './Logout';
import UserInfoModal from './UserInfoModal';


const UserModal = ({setOpenUserModal}) => {

    const { user } = useContext(UserContext);
    
    const [ openUserInfoModal, setOpenUserInfoModal ] = useState(false);

    return (
        <ModalShell>
            <button onClick={() => setOpenUserModal(false)}> X </button>
            <Link to={`/${user.displayName}`}> My Clusters </Link>
            <button onClick={() => setOpenUserInfoModal(!openUserInfoModal) }> Update My Info </button>
            {openUserInfoModal && <UserInfoModal setOpenUserInfoModal={setOpenUserInfoModal} />}
            <Logout />
        </ModalShell>
    )
}

const ModalShell = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px black solid;
    position: absolute;
    top: 50px;

`

export default UserModal;