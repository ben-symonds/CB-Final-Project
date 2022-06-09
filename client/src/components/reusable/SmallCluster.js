import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Tag from './Tag';

const SmallCluster = ({clusterId, title, tags }) => {
    return (
        <>
            {/* {tags.length > 0 && tags.map(tag => <Tag tagName={tag} key={tag} />)} */}
            <SmallClusterShell to={`/cluster/${clusterId}`}>
                {title}
            </SmallClusterShell>
        </>
    )
}

const SmallClusterShell = styled(Link) `
    padding: 20px;
    margin: 20px;
    width: 10%;
    height: 10%;
    border: 1px solid black;
`

export default SmallCluster;