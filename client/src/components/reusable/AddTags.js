import { useState } from 'react';
import styled from 'styled-components';

import Tag from './Tag';

const AddTags = ({tags, setTags}) => {

    const [ tag, setTag ] = useState('');

    const handleOnClick = () => {
        if(tag && tags.length < 5 && !tags.includes(tag)){ 
            const processedTag = tag.trim().toLowerCase();
            if(processedTag.length >= 3) {
                const newTagsArr = tags;
                newTagsArr.push(processedTag);
                newTagsArr.sort();
                setTags(newTagsArr);
                setTag('');
            }
        }
    }

    return (
        <Wrapper>
            <input 
                type='text'
                placeholder='add tags'
                value={tag}
                onChange={e => {
                    setTag(e.target.value)
                }}
            />
            <button onClick={handleOnClick}> 
                + 
            </button> 
            {tags.length > 0 && tags.map(tag => <Tag tagName={tag} key={tag} /> )}
            <div> <p> tags can be between 3 to 12 characters long. Maximum of 5 tags per cluster  </p> </div>
        </Wrapper>
    )
}

export default AddTags;

const Wrapper = styled.div`

`