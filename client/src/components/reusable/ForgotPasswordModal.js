import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styled from 'styled-components';

const ForgotPasswordModal = () => {

    const [ email, setEmail ] = useState(null);

    const auth = getAuth();

    const  handleSubmit = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <form onSubmit={handleSubmit} > 
            <input 
                required 
                type='email'
                placeholder='Email'
                onChange={e => {
                    setEmail(e.target.value);
                }}
                style={{width: '50%'}}
            />
            <input 
                type='submit'
                value='Send New Password'
                style={{backgroundColor: 'white',
                    cursor: 'pointer'
                }}
            />
        </form>
    )

}

export default ForgotPasswordModal;