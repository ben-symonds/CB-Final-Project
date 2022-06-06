import { useState } from 'react';

const CreateCluster = () => {

    // const [file, setFile] = useState(null); 
    // const [filename, setFilename] = useState('Choose File');  

    // const handleChange = e => {
    //     setFile(e.target.files[0]);
    //     setFilename(e.target.files[0].name);
    // }

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     console.log(formData);

    //     fetch('http://localhost:8000/api/upload', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Accept': 'multipart/form-data',
    //         },
    //         body: formData
    //     })      
    //     .then(res => console.log(res.data));
    // }

    return ( 
        <>
            Create a Cluster
            {/* <form onSubmit={handleSubmit}> 
                <input type='file' onChange={handleChange} />
                <input type='submit' />
            </form> */}
        </>
    )
}

export default CreateCluster; 