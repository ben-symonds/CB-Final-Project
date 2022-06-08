import { useState, useContext } from 'react';
import { updateEmail, updateProfile, deleteUser } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';

const UserInfoModal = ({setOpenUserInfoModal, setOpenUserModal}) => {

    const { user } = useContext(UserContext);

    const [ newUsername, setNewUsername ] = useState(user.displayName);
    const [ newEmail, setNewEmail ] = useState(user.email);


    const handleUpdate = async e => {
        e.preventDefault();
        try {
            await updateProfile(auth.currentUser, {displayName: newUsername});
            await updateEmail(auth.currentUser, newEmail);
            setOpenUserModal(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteUser(user);
            setOpenUserModal(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <ModalShell>
            <Divider />
            <ExitButton onClick={() => setOpenUserInfoModal(false)} > X </ExitButton>
            <Divider />
            <form onSubmit={handleUpdate} >
                <div> 
                    <label htmlFor='username-input'> username </label>
                    <input 
                        className='username-input' 
                        defaultValue={newUsername} 
                        required 
                        type='text' 
                        onChange={e => {
                            setNewUsername(e.target.value)
                        }}
                    />
                </div>
                <div> 
                    <label htmlFor='email-input'> email </label>
                    <input 
                        className='email-input' 
                        defaultValue={newEmail} 
                        required 
                        type='text'
                        onChange={e => {
                            setNewEmail(e.target.value)
                        }}
                    />
                </div>
                <div> 
                    <input type='submit' />
                    <button onClick={handleDelete}> Delete Account </button>
                </div>

            </form>
            <Divider />
        </ModalShell>
    )
}

const ModalShell = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15vw;
    min-width: 298px;

    input {
        margin: 3px 5px;
        border: black 1px solid;
        padding: 3px;
    }

    form {

        margin-top: 5px;

        div {
            margin-left: 7px;
        }
    }

`
const ExitButton = styled.button `
    width: 20px;
    margin-left: 1px;
`

const Divider = styled.div `
    width: 100%;
    border-bottom: 1px solid black;
`

export default UserInfoModal;