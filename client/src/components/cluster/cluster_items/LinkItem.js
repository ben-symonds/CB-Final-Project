import styled from 'styled-components';

const LinkItem = ({url, description, date, id}) => {
    return (
        <LinkItemShell>
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