import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';
import Logout from './Logout';
import UserInfoModal from './UserInfoModal';

const UserModal = ({setOpenUserModal}) => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    
    const [ openUserInfoModal, setOpenUserInfoModal ] = useState(false);

    const handleProfileOnClick = () => {
        setOpenUserModal(false);
        navigate(`/user/${user.uid}`)
    }

    return (
        <ModalShell>
            <ExitButton 
                onClick={() => {
                    setOpenUserModal(false);
                }}
            > 
                X 
            </ExitButton>
            <Divider />
            <ProfileButton onClick={handleProfileOnClick}> my clusters </ProfileButton>
            <Logout setOpenUserModal={setOpenUserModal} />
            <UpdateButton 
                onClick={() => {
                    setOpenUserInfoModal(!openUserInfoModal)
                }}
                style={
                    openUserInfoModal ? 
                        {backgroundColor: '#000',
                        color: '#fff'}
                        :{backgroundColor: '#fff',
                        color: '#000'}
                    }
            > 
                update login info
            </UpdateButton>
            {openUserInfoModal && <UserInfoModal setOpenUserInfoModal={setOpenUserInfoModal} setOpenUserModal={setOpenUserModal} />}
        </ModalShell>
    )
}

const ModalShell = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15vw;
    min-width: 300px;
    border: 1px black solid;
    background-color: white;
    position: absolute;
    top: 35px;
`
const ExitButton = styled.button `
    width: 20px;
    margin-left: 1px;
`

const Divider = styled.div `
    width: 100%;
    border-bottom: 1px solid black;
`

const ProfileButton = styled.button`
    color: purple;
    width: 88px;
`
const UpdateButton = styled.button `
    width: 123px;
`

export default UserModal;