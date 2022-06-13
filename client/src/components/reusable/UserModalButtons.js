import { useState } from 'react';

import SignInModal from '../reusable/SignInModal';
import RegisterModal from '../reusable/RegisterModal';

const UserModalButtons = ({page}) => {

    const [ openSignInModal, setOpenSignInModal ] = useState(false);
    const [ openRegisterModal, setOpenRegisterModal ] = useState(false);

    return (
        <>
            <button 
            
                onClick={() => {
                    setOpenRegisterModal(false);
                    setOpenSignInModal(!openSignInModal);
                }}

                style={
                    openSignInModal ? 
                    {backgroundColor: '#000',
                    color: '#fff'}
                    :{backgroundColor: '#fff',
                    color: '#000'}
                }
            >

                sign in 
            </button>
            {openSignInModal && <SignInModal page={page} setOpenSignInModal={setOpenSignInModal} />}
            <button 
            
                onClick={() => { 
                    setOpenSignInModal(false);
                    setOpenRegisterModal(!openRegisterModal);
                }}

                style={
                    openRegisterModal ? 
                    {backgroundColor: '#000',
                    color: '#fff'}
                    :{backgroundColor: '#fff',
                    color: '#000'}
                }
            >  
                create an account 
            </button>
            {openRegisterModal && <RegisterModal page={page} setOpenRegisterModal={setOpenRegisterModal} />}
        </>
    )
}

export default UserModalButtons;