import { useState } from 'react';
import styled from 'styled-components';

const AddTagsNewCluster = ({tags, setTags, setUpdateTags}) => {

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
                    placeholder='add tags...'
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

const Wrapper = styled.div`
display: flex;
align-items: center;
`
const StyledForm = styled.form `
    margin-right: 5px;
    display: flex;
`


const TagsWrapper = styled.div `
display: flex;
`

const TagWrapper = styled.span `
    display: flex;
    align-items: center;
    margin-left: 20px;

    button{
        font-size: 20px;
        margin-right: 5px;

        &:hover {
            color: lightgray;
        }
    }
`

const Tag = styled.span `
    font-size: 20px;
    border: 1px solid black;
    padding-top: 5px;
    text-align: center;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
    font-style: italic;
`

const Text = styled.input `
    width: 70px;
    font-size: 16px;
    border: 1px lightgray solid;
    padding: 2px 10px;
    font-family: 'Amiri', serif;
    line-height: 15px;
    color: gray;
    border-radius: 5px;
    &:focus {
        border: 1px solid gray;
    }
`

const Submit = styled.input `
    margin-right: 5px;
    background: white;
    font-size: 20px;
    border: none;
    cursor: pointer;
    
    &:hover {
        color: lightgray;
    }
`

export default AddTagsNewCluster;