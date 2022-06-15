import { useState, useContext } from 'react';
import { updateEmail, updateProfile, deleteUser } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const UserInfoModal = ({setOpenUserInfoModal, setOpenUserModal}) => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [ newUsername, setNewUsername ] = useState(user.displayName);
    const [ newEmail, setNewEmail ] = useState(user.email);


    const handleUpdate = async e => {
        e.preventDefault();
        try {
            await updateProfile(auth.currentUser, {displayName: newUsername});
            await updateEmail(auth.currentUser, newEmail);
            setOpenUserModal(false);

            await fetch(`/patch-user-info/${user.uid}/${newUsername}`, {
                method: "PATCH"
            })

        } catch (err) {
            console.log(err.message);
        }


    }

    const handleDelete = async () => {
        try {

            await fetch(`/delete-user/${user.uid}`, {
                method: "DELETE"
            })

            await deleteUser(auth.currentUser); 
            setOpenUserModal(false);

            navigate('/');
            

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
                <> 
                    <Submit type='submit' />
                    <button onClick={handleDelete}> Delete Account </button>
                </>

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
    background-color: white;
    z-index: 10000;

    input {
        margin: 3px 5px;
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
    font-size: 10px;
    margin-left: 1px;
`

const Divider = styled.div `
    width: 100%;
    border-bottom: 1px solid black;
`

const Submit = styled.input `
    border: 1px black solid;
    background-color: #fff;
    &:hover {
        border: 1px solid lightgray;
        color: lightgray;
    }
`

export default UserInfoModal;