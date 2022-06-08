import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const LinkItem = ({url, description, date, itemId, belongsToCurrentUser}) => {
    return (
        <LinkItemShell>
            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
            <div> {date} </div>
            {description && <div> { description } </div>}
            <a href={url}> {url} </a> 
        </LinkItemShell>
    )
}

const LinkItemShell = styled.div `
    border: 1px black solid;
`
export default LinkItem