import { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';
import UserModalButtons from '../reusable/UserModalButtons';
import Logout from './Logout';
import UserInfo from './UserInfo';

const Header = () => {

    const { user } = useContext(UserContext);

    return (
        <>
            Header
            { !user && <UserModalButtons /> } 
            { user && <Logout /> }
            { user && <UserInfo /> }
        </>
    )
}

export default Header;