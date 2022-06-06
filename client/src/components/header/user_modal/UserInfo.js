import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

const UserInfo = () => {

    const { user } = useContext(UserContext);

    return (
        <>
            { user.displayName }
        </>
    )
}

export default UserInfo;