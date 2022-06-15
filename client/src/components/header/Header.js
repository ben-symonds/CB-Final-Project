import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';
import UserModalButtons from '../reusable/UserModalButtons';
import UserModal from './user_modal/UserModal';

const Header = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [ openUserModal, setOpenUserModal ] = useState(false);

    const handleExploreOnClick = () => {
        setOpenUserModal(false)
        navigate('/explore')
    }

    const handleProfileOnClick = () => {
        setOpenUserModal(false);
        navigate(`/user/${user.uid}`)
    }

    return (
        <HeaderShell>
            <div style={{fontSize: '35px'}}> Cluster </div>
            <ButtonWrapper>
                <button onClick={handleExploreOnClick}> explore </button>
                { !user && <UserModalButtons page='header' /> } 
                { user && <button onClick={handleProfileOnClick}> my clusters </button>}
                { user && <button 
                    onClick={() => {
                        setOpenUserModal(!openUserModal)
                    }}
                    style={
                        openUserModal ? 
                            {backgroundColor: '#202121',
                            color: '#fff'}
                            :{backgroundColor: '#fff',
                            color: '#202121'}
                        }
                    >
                        {user.displayName } 
                    </button> }
                { openUserModal && <UserModal setOpenUserModal={setOpenUserModal}/> }
            </ButtonWrapper>
        </HeaderShell>
    )
}

const HeaderShell = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gray;
`

const ButtonWrapper = styled.div `
    width: 100px;
    min-width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        padding: 4px;
        &:hover {
            color: lightgray;
        }
    }
`

export default Header;