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
        <form>
            <button onClick={handleSubmit}> <AiOutlineSearch size={20}  /> </button>
            <StyledSearchBar 
                type='text' 
                placeholder='search... ' 
                onChange={e => {
                    setTagSearch(e.target.value);
                }}
            />
        </form>
    )
}

const StyledSearchBar = styled.input `
    width: 400px;
    font-size: 25px;
    border: none;
    height: 30px;
    margin-bottom: 20px;

`

export default SearchBar;