import  { createContext, useState, useEffect } from 'react';
import { 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../../firebase-config';

export const UserContext = createContext(null);

const UserProvider = ({children}) => {

    const [ user, setUser ] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
    }, [])

    return (
        <> 
            <UserContext.Provider 
                value={{user}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserProvider;

