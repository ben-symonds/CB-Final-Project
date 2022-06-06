import { useState, useContext } from 'react';
import { updateEmail, updateProfile, deleteUser } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { UserContext } from '../../contexts/UserContext';

const UserInfoModal = ({setOpenUserInfoModal}) => {

    const { user } = useContext(UserContext);

    const [ newUsername, setNewUsername ] = useState(user.displayName);
    const [ newEmail, setNewEmail ] = useState(user.email);


    const handleUpdate = async e => {
        e.preventDefault();
        try {
            await updateProfile(auth.currentUser, {displayName: newUsername});
            await updateEmail(auth.currentUser, newEmail);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteUser(user);
        } catch (err) {
            console.log(err.message);
        }
    }

    console.log(user);

    return (
        <>
            <button onClick={() => setOpenUserInfoModal(false)} > X </button>
            <form onSubmit={handleUpdate} >
                <div> 
                    <label htmlFor='username-input'> Username </label>
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
                    <label htmlFor='email-input'> Email </label>
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
                    <button onClick={() => setOpenUserInfoModal(false)} > Cancel </button>
                    <button onClick={handleDelete}> Delete Account </button>
                </div>

            </form>
        </>
    )
}

export default UserInfoModal;