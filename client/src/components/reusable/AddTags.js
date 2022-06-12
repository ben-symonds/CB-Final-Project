import { useState } from 'react';
import styled from 'styled-components';

import Tag from './Tag';

const AddTags = ({tags, setTags, setUpdateTags}) => {

    const [ newTag, setNewTag ] = useState('');

    const handleAddTag = () => {
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
            <input 
                type='text'
                placeholder='add tags'
                value={newTag}
                onChange={e => {
                    setNewTag(e.target.value)
                }}
            />
            <button onClick={handleAddTag}> 
                + 
            </button> 
            {tags.length > 0 && tags.map(tag => 
                <span key={`${tag}-span`}>
                    <button key={`${tag}-btn`}  onClick={() => handleRemoveTag(tag)}> x </button>
                    <Tag tagName={tag} key={tag} /> 
                </span>
            )}
            <div> <p> tags can be between 3 to 12 characters long. Maximum of 5 tags per cluster  </p> </div>
        </Wrapper>
    )
}

export default AddTags;

const Wrapper = styled.div`

`