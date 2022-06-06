import { useState, useContext } from 'react';
import { 
    signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import { UserContext } from '../contexts/UserContext';


const SignInModal = ({setOpenSignInModal}) => {

    const {
        
    } = useContext(UserContext);

    const [ loginEmail, setLoginEmail ] = useState(null);
    const [ loginPassword, setLoginPassword ] = useState(null);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            );
            console.log(user);
        } catch (err) {
            console.log(err.message);
        }
        
    }
    
    return (
        <div>
            <button
                onClick={() => {
                    setOpenSignInModal(false)
                }}
            > 
                X 
            </button>
            <form onSubmit={handleLogin}>
                <h3> Login  </h3>
                <input  
                    placeholder='Email' 
                    required
                    type='text' 
                    onChange={e => {
                        setLoginEmail(e.target.value);
                    }} 
                />
                <input 
                    placeholder='Password' 
                    required
                    type='text' 
                    onChange={e => {
                        setLoginPassword(e.target.value);
                    }} 
                />
                <input type='submit' value='Login'/>
            </form>
        </div>
    )
}

export default SignInModal;