import {  useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

const EditCluster = () => {

    const { user } = useContext(UserContext);

    //grabs cluster id from url 
    const { id } = useParams();
    
    //stores cluster object once retrieved from DB
    const [ cluster, setCluster ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    //retrieves cluster object from DB
    useEffect(() => {
        fetch(`/get-cluster/${id}`)
        .then(res => res.json())
        .then(data => {
            setCluster(data.data);
            setLoading(false);
        })
    }, [])

    return (
        <>
            {loading ?
            <div> loading </div>
            :<div>
                <div> This is it </div>
                //if cluster belongs to user allow option to edit 
                {user.uid === cluster.userId && <div> Add elmement </div>}
                <h1> {cluster.title} </h1>
                {cluster.description && <p> {cluster.description} </p>}
                {cluster.tags.length && 
                    cluster.tags.map((tag) => {
                        <div> {tag} </div>
                    })
                }
                {cluster.items.length ?
                <>

                </>
                : <div> cluster is empty </div>}
            </div>

            }

        </>
    )
}

export default EditCluster;