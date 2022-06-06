import { useState } from 'react';

import SignInModal from '../reusable/SignInModal';
import RegisterModal from '../reusable/RegisterModal';

const UserModalButtons = () => {

    const [ openSignInModal, setOpenSignInModal ] = useState(false);
    const [ openRegisterModal, setOpenRegisterModal ] = useState(false);

    return (
        <>
            <button onClick={() => {
                setOpenSignInModal(true);
            }}>  
                Sign In 
            </button>
            {openSignInModal && <SignInModal setOpenSignInModal={setOpenSignInModal} />}
            <button onClick={() => {
                setOpenRegisterModal(true);
            }}>  
                Create an Account 
            </button>
            {openRegisterModal && <RegisterModal setOpenRegisterModal={setOpenRegisterModal} />}
        </>
    )
}

export default UserModalButtons;