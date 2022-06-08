import styled from 'styled-components';

const TextItem = ({id, text, date}) => {
    return (
        <TextItemShell>
            {/* <Delete />  */}
            <div> {date} </div>
            <div> {text} </div>
        </TextItemShell>
    )
}

const TextItemShell = styled.div `
    border: 1px black solid;
`


export default TextItem;  