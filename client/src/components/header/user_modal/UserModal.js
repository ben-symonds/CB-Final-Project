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
            <ExitButton 
                onClick={() => {
                    setOpenUserModal(false);
                }}
            > 
                X 
            </ExitButton>
            <Divider />
            <StyledLink to={`/${user.displayName}`}> my clusters </StyledLink>
            <Logout />
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
            {openUserInfoModal && <UserInfoModal setOpenUserInfoModal={setOpenUserInfoModal} />}
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

const StyledLink = styled(Link)`
    color: purple;
    width: 76px;
    margin: 5px;
`
const UpdateButton = styled.button `
    width: 123px;
`

export default UserModal;