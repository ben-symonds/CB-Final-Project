import { useState } from 'react'; 

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
                    setNoMatchMessage('');
                    setCurrentTag(processedTagSearch);
                    setLoading(false);
                } else {
                    setNoMatchMessage(data.message);
                    setClusters([]);
                    setLoading(false);
                }
            })
        }
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder='search... ' 
                onChange={e => {
                    setTagSearch(e.target.value);
                }}
            />
            <input type='submit' />
        </form>
    )
}

export default SearchBar;