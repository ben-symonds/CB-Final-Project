import { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase-config';
import styled from 'styled-components';

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
        <ModalShell>
            <button onClick={() => {
                setOpenRegisterModal(false)
            }}
            > 
                X 
            </button>
            <Divider />
            <form  onSubmit={handleRegister}>
                <div>
                    <input 
                        placeholder='Username' 
                        required
                        type='text' 
                        onChange={e => {
                            setRegisterUsername(e.target.value);
                        }} 
                    /> 
                </div>
                <div>
                    <input 
                        placeholder='Email' 
                        required
                        type='text'
                        onChange={e => {
                            setRegisterEmail(e.target.value);
                        }} 
                    />
                </div>
                <div>
                    <input 
                        placeholder='Password' 
                        required
                        type='password' 
                        onChange={e => {
                            setRegisterPassword(e.target.value);
                        }} 
                    />
                </div>
                <Submit type='submit' value='create account'  />
                
            </form>
        </ModalShell>
    )
}

const ModalShell = styled.div `
    display: flex;
    width: 15vw;
    min-width: 300px;
    flex-direction: column;
    border: 1px black solid;
    position: absolute;
    top: 35px;

    button {
        width: 20px;
        margin-left: 1px;
    }

    form {
        margin: 5px 0px;
    }
    input {
        margin: 3px 5px;
        border: black 1px solid;
        padding: 3px;
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



export default RegisterModal;