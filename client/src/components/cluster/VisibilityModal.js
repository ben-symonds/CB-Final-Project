import { useParams } from 'react-router-dom';

const VisibilityModal = ({visibility, setOpenChangeVisibilityModal, setVisibilitySetting}) => {

     //grabs cluster id from url 
    const { id } = useParams();

    const changeVisibility = async () => {
        await fetch(`/patch-cluster-visibility/${id}/${visibility === 'public' ? 'private' : 'public'}`, {
            method: "PATCH"
        }) .then(res => res.json())
        .then(data => {
            setVisibilitySetting(visibility === 'public' ? 'private' : 'public');
            setOpenChangeVisibilityModal(false);
        })

        
    }

    return (    
        <div>
            <button
                onClick={() => {
                    setOpenChangeVisibilityModal(false)
                }}
            > X </button>
            {visibility === 'public' ?
            <button onClick={changeVisibility}> make cluster private </button>
            :<button onClick={changeVisibility}> make cluster public </button> }
        </div>
    )
}

export default VisibilityModal;