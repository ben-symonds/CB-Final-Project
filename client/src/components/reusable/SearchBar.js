import { useState } from 'react'; 
import { AiOutlineSearch } from "react-icons/ai";

import styled from 'styled-components';


const SearchBar = ({setClusters, setLoading, setNoMatchMessage, setCurrentTag}) => {

    const [ tagSearch, setTagSearch ] = useState(''); 

    const handleSubmit = e => {
        e.preventDefault()
        
        const processedTagSearch = tagSearch.toLowerCase().trim();

        if(processedTagSearch.length >= 3){

            setLoading(true);

            fetch(`/get-public-clusters/${processedTagSearch}`)
            .then(res => res.json())
            .then(data => {
                if(data.message === 'Public Clusters Retrived By Tag') {
                    setClusters(data.data);
                    setNoMatchMessage(null);
                    setCurrentTag(processedTagSearch);
                    setLoading(false);
                } else {
                    setNoMatchMessage(data.message);
                    setClusters([]);
                    setCurrentTag(null);
                    setLoading(false);
                }
            })
        }
    }
    

    return (
        <StyledForm>
            <button onClick={handleSubmit}> <AiOutlineSearch size={20}  /> </button>
            <StyledSearchBar 
                type='text' 
                placeholder='search . . . ' 
                onChange={e => {
                    setTagSearch(e.target.value);
                }}
            />
        </StyledForm>
    )
}

const StyledForm = styled.form `
    display: flex;
    margin-top: 15px;
`

const StyledSearchBar = styled.input `

    width: 400px;
    font-style: italic;
    font-size: 29px;
    padding-left: 10px;
    border: 1px lightgray solid;
    border-radius: 8px;
    color: gray;
    height: 40px;
    margin-left: 5px;

`

export default SearchBar;