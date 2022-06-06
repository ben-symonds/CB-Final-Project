import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase-config';

const Logout = () => {

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}

export default Logout;