import styled from 'styled-components';

import DeleteClusterItem from './DeleteClusterItem'

const TextItem = ({text, date, itemId, belongsToCurrentUser, link, header}) => {
    return (
        <TextItemShell>
            {belongsToCurrentUser && <DeleteClusterItem itemId={itemId} /> }
            <div> {date} </div>
            {header && <h1> {header} </h1>}
            <p style={{whiteSpace: 'pre-wrap'}}> {text} </p>
            {link &&  <a href={link} target='_blank'> {link} </a> }
        </TextItemShell>
    )
}

const TextItemShell = styled.div `
    border: 1px black solid;
`


export default TextItem;  