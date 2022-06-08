import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const TextItem = ({text, date, itemId, belongsToCurrentUser}) => {
    return (
        <TextItemShell>
            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
            <div> {date} </div>
            <div> {text} </div>
        </TextItemShell>
    )
}

const TextItemShell = styled.div `
    border: 1px black solid;
`


export default TextItem;  