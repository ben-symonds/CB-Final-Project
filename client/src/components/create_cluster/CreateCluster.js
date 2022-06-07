import { useState } from 'react';
import styled from 'styled-components';

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
        <FormShell>
            <h3> New Cluster </h3>
            <form> 
                <div> 
                    <label htmlFor='title'> Title </label>
                    <input type='text' className='title' />
                </div>
                <div> 
                    <label htmlFor='description'> Description </label>
                    <textarea className='description' />
                </div>
                <div>
                    <label htmlFor='visibility' />
                    <input type='radio' value='public' className='visibility' />
                    <input type='radio' value='private' className='visibility' />
                </div>
                <input type='submit' value='create cluster' />
            </form>
            {/* <form onSubmit={handleSubmit}> 
                <input type='file' onChange={handleChange} />
                <input type='submit' />
            </form> */}
        </FormShell>
    )
}

const FormShell = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default CreateCluster; 