import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';


const SignInModal = ({setOpenSignInModal, page}) => {

    const {
        
    } = useContext(UserContext);

    const [ loginEmail, setLoginEmail ] = useState(null);
    const [ loginPassword, setLoginPassword ] = useState(null);
    const [ errorMsg, setErrorMsg ]  = useState(null);

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            );
            setErrorMsg(null);
        } catch (err) {
            console.log(err.message);
            setErrorMsg('x Please enter a valid email and password x')
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
            <button
                style={{fontSize: '12px'}}
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
                        className= 'text-input'
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
                        className= 'text-input'
                        placeholder='Password' 
                        required
                        type='password' 
                        onChange={e => {
                            setLoginPassword(e.target.value);
                        }} 
                    />
                </div>
                {errorMsg && <Error> {errorMsg} </Error>}
                <SubmitWrapper> 
                    <Submit type='submit' value='sign in'/>
                    <span> forgot your password? </span>
                </SubmitWrapper> 
                
            </form>
        </ModalShell>
    )
}

const ModalShell = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15vw;
    background-color: white;
    min-width: 300px;
    border: 1px black solid;

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
const SubmitWrapper = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;

    span {
        font-size: 12px;
    }
`
const Submit = styled.input `
    background-color: #fff;
    cursor: pointer;
`

export default SignInModal;