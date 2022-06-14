import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const LinkItem = ({url, description, date, itemId, belongsToCurrentUser, name}) => {
    return (
        <LinkItemShell>
            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
            <div> {date} </div>
            {name ? 
            <a href={url} target='_blank'>  {name} </a> 
            :<a href={url} target='_blank'>  {url} </a> } 
            {description && <div> { description } </div>}
        </LinkItemShell>
    )
}

const LinkItemShell = styled.div `
    border: 1px black solid;
    line-height: 18px;

    &:hover {
        box-shadow: 0px 1px 7px -3px rgba(102,102,102,0.58);

    }
`
export default LinkItem