import { useState, useContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import { UserContext } from '../contexts/UserContext';

const RegisterModal = ({setOpenRegisterModal}) => {

    const {} = useContext(UserContext);

    const [ registerEmail, setRegisterEmail ] = useState(null);
    const [ registerPassword, setRegisterPassword ] = useState(null);
    const [ registerUsername, setRegisterUsername ] = useState(null);

    const handleRegister = async e => {
        e.preventDefault();  
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await updateProfile(auth.currentUser, {displayName: registerUsername})

            const dbTestUser = { 
                username: user.user.displayName,  
                id: user.user.uid
            }

            fetch("/post-user", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    'Accept' : 'application/json',
                },
                body: JSON.stringify(dbTestUser)
            })
            
        } catch (err) {
            console.log(err.message);
        }

    }

    return (
        <div>
            <button onClick={() => {
                setOpenRegisterModal(false)
            }}
            > 
                X 
            </button>
            <form onSubmit={handleRegister}>
                <h3> Register User  </h3>
                <input 
                    placeholder='Username' 
                    required
                    type='text' 
                    onChange={e => {
                        setRegisterUsername(e.target.value);
                    }} 
                /> 
                <input 
                    placeholder='Email' 
                    required
                    type='text'
                    onChange={e => {
                        setRegisterEmail(e.target.value);
                    }} 
                />
                <input 
                    placeholder='Password' 
                    required
                    type='text' 
                    onChange={e => {
                        setRegisterPassword(e.target.value);
                    }} 
                />
                <input type='submit' value='Create User'  />
            </form>
    </div>
    )
}

export default RegisterModal;