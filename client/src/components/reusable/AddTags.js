import { useState } from 'react';
import styled from 'styled-components';

const AddTags = ({tags, setTags, setUpdateTags}) => {

    const [ newTag, setNewTag ] = useState('');

    const handleAddTag = e => {
        e.preventDefault();
        if(newTag && tags.length < 5 && !tags.includes(newTag)){ 
            const processedTag = newTag.trim().toLowerCase();
            if(processedTag.length >= 3 && processedTag.length <= 12) {
                const newTagsArr = tags;
                newTagsArr.push(processedTag);
                const sortedArr = newTagsArr.sort();
                setNewTag('');
                setTags([...sortedArr]);
                // setUpdateTags(true);
            }
        }
    }

    const handleRemoveTag = tag => {
        const newTagsArr = tags;
        newTagsArr.splice(newTagsArr.indexOf(tag), 1);
        setTags([...newTagsArr]);
        // setUpdateTags(true);
    }

    return (
        <Wrapper>
            <StyledForm onSubmit={handleAddTag}> 
                <Submit type='submit' value='+'/>
                <Text 
                    type='text'
                    placeholder='add tag...'
                    value={newTag}
                    onChange={e => {
                        setNewTag(e.target.value)
                    }}
                />
            </StyledForm>
            <TagsWrapper> 
                {tags.length > 0 && tags.map(tag => 
                    <TagWrapper key={`${tag}-span`}>
                        <button key={`${tag}-btn`}  onClick={() => handleRemoveTag(tag)}> x </button>
                        <Tag key={tag}> {tag} </Tag> 
                    </TagWrapper>
                )}
            </TagsWrapper>
        </Wrapper>
    )
}

export default AddTags;

const Wrapper = styled.div`
    display: flex;
    align-items: center;    
`
const StyledForm = styled.form `
    margin-right: 10px;
    display: flex;
`


const TagsWrapper = styled.div `
    display: flex;
`

const TagWrapper = styled.span `
    display: flex;
    align-items: center;

    button{
        font-size: 20px;
        display: flex;
        margin-right: 5px;
        margin-left: 10px;
    }
`

const Tag = styled.span `
    border: 1px solid black;
    font-size: 15px;
    padding: 7px 9px;
    font-style: italic;
    border-radius: 12px;
    margin-right: 5px;
`

const Text = styled.input `
    width: 70px;
    border: 1px lightgray solid;
    font-size: 15px;
    height: 20px;
    font-family: 'Amiri', serif;
    padding: 2px 10px;
    color: gray;
    border-radius: 10px;
`

const Submit = styled.input `
    font-size: 20px;
    background: white;
    border: none;
    cursor: pointer;

    &:hover {
        color: lightgray;
    }
`