const CreateCluster = () => {
    return (
        <>
            Create a Cluster
            <form method='POST' action='/image-upload' encType='multipart/form-data'>
                <input type='file' name='image' />
                <input type='submit' />  
            </form>
        </>
    )
}

export default CreateCluster; 