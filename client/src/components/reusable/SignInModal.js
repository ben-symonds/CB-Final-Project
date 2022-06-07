import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import styled from 'styled-components';

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
        <ModalShell>
            <button
                onClick={() => {
                    setOpenSignInModal(false)
                }}
            > 
                X
            </button>
            <Divider />
            <form onSubmit={handleLogin}>
                <div>
                    <input  
                        placeholder='Email' 
                        required
                        type='text' 
                        onChange={e => {
                            setLoginEmail(e.target.value);
                        }} 
                    />
                </div>
                <div>
                    <input 
                        placeholder='Password' 
                        required
                        type='text' 
                        onChange={e => {
                            setLoginPassword(e.target.value);
                        }} 
                    />
                </div>
                <Submit type='submit' value='sign in'/>
                <span> forgot your password? </span>
            </form>
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

    button {
        width: 20px;
        margin-left: 1px;
    }

    form {
        margin: 5px 0px 2px 0px;
    }
    
    input {
        margin: 3px 5px;
        border: black 1px solid;
        padding: 3px;
    }

    span {
        font-size: 12px;
        position: absolute;
        right: 10px;
        bottom: 9px;
    }
`

const Divider = styled.div `
    width: 100%;
    border-bottom: 1px solid black;
`

const Submit = styled.input `
    background-color: #fff;
    cursor: pointer;
`

export default SignInModal;