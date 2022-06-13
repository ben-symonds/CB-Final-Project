import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const TextItem = ({text, date, itemId, belongsToCurrentUser}) => {
    return (
        <TextItemShell>
            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
            <div> {date} </div>
            <p style={{whiteSpace: 'pre-wrap'}}> {text} </p>
        </TextItemShell>
    )
}

const TextItemShell = styled.div `
    border: 1px black solid;
`


export default TextItem;  