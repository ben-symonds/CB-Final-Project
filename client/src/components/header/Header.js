import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';
import UserModalButtons from '../reusable/UserModalButtons';
import UserModal from './user_modal/UserModal';

const Header = () => {

    const { user } = useContext(UserContext);

    const [ openUserModal, setOpenUserModal ] = useState(false);

    return (
        <HeaderShell>
            <div> logo </div>
            <ButtonWrapper>
                <Link to='/explore/all'> explore </Link>
                { !user && <UserModalButtons /> } 
                { user && <Link to={`/user/${user.uid}`}>my clusters</Link> }
                { user && <button 
                    onClick={() => {
                        setOpenUserModal(!openUserModal)
                    }}
                    style={
                        openUserModal ? 
                            {backgroundColor: '#000',
                            color: '#fff'}
                            :{backgroundColor: '#fff',
                            color: '#000'}
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
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ButtonWrapper = styled.div `
    width: 15vw;
    min-width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default Header;