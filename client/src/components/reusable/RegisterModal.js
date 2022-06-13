import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase-config';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';

const RegisterModal = ({setOpenRegisterModal, page}) => {

    const navigate = useNavigate();

    const {} = useContext(UserContext);

    const [ registerEmail, setRegisterEmail ] = useState(null);
    const [ registerPassword, setRegisterPassword ] = useState(null);
    const [ registerUsername, setRegisterUsername ] = useState(null);
    const [ errorMsg, setErrorMsg ]  = useState(null);

    const handleRegister = async e => {
        e.preventDefault();  
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await updateProfile(auth.currentUser, {displayName: registerUsername})

            const dbTestUser = { 
                username: user.user.displayName,  
                id: user.user.uid
            }

            await fetch("/post-user", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    'Accept' : 'application/json',
                },
                body: JSON.stringify(dbTestUser)
            })

            navigate(`/user/${user.user.uid}`)
            
        } catch (err) {
            console.log(err.message);
            if(err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setErrorMsg('x Password should be at least 6 characters x')
            } else if(err.message === 'Firebase: Error (auth/invalid-email).') {
                setErrorMsg('x Please enter a valid username and email x')
            } else if(err.message === 'Firebase: Error (auth/email-already-in-use).') {
                setErrorMsg('x This email is already in-use x')
            }
        }

    }

    return (
        <ModalShell
            style={
                page === 'header' ? 
                {position: 'absolute',
                top: '34px',
                width: '300px'

                } 
                :{
                    width: '500px'}
                }
        >
            <button style={{fontSize: '12px'}} onClick={() => {
                setOpenRegisterModal(false)
            }}
            > 
                X 
            </button>
            <Divider />
            <form  onSubmit={handleRegister}>
                <div>
                    <input 
                        className='text-input'
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
                        className='text-input'
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
                        className='text-input'
                        placeholder='Password' 
                        required
                        type='password' 
                        onChange={e => {
                            setRegisterPassword(e.target.value);
                        }} 
                    />
                </div>
                {errorMsg && <Error> {errorMsg} </Error>}
                <Submit type='submit' value='create account'  />
                
            </form>
        </ModalShell>
    )
}

const ModalShell = styled.div `
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px black solid;

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

    .text-input {
        width: 70%;
    }
`

const Divider = styled.div `
    width: 100%;
    border-bottom: 1px solid black;
`

const Error = styled.div `
    margin-left: 7px;
    font-size: 12px;
`

const Submit = styled.input `
    background-color: #fff;
    cursor: pointer;
`



export default RegisterModal;