import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SmallCluster = ({clusterId, title }) => {
    return (
        <SmallClusterShell to={`/cluster/${clusterId}`}>
            {title}
        </SmallClusterShell>
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