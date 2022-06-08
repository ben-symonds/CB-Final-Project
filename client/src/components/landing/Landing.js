import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import UserModalButtons from '../reusable/UserModalButtons';

const Landing = () => {

    const navigate = useNavigate();
    
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(user) {
            navigate(`/user/${user.uid}`);
        }
    }, [user])

    return (
        <>
            <div> Nice Header BG Image  </div>
            <div> Logo </div>
            <div> Something about the site </div>
            <UserModalButtons />
            <div> Browse Public Clusters </div>
            {  user?.email } 
        </>
    )
}

export default Landing;