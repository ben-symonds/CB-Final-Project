import { useState } from 'react';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Profile = () => {

    const [ url, setUrl ] = useState(null);
    
    return (
        <Wrapper>
            <Link to='/create'> + </Link>
                <input type='url' onChange={e =>  setUrl(e.target.value) } />
                {url && <ReactPlayer url={url} />}
        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
    height: 80vh;

    input {
        height: 20px;
        width: 200px;
        margin-top: 20px;
    }
`


export default Profile;