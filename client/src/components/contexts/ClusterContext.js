import  { createContext, useState, useEffect } from 'react';

export const ClusterContext = createContext(null);

const ClusterProvider = ({children}) => {

     //stores a boolean depending on whether cluster has been updated (deleted or added to)
     const [ update, setUpdate ] = useState(true);

     //stores boolean depending on open modal
     const [ openAddClusterItemModal, setOpenAddClusterItemModal ] = useState(false);
    

    return (
        <> 
            <ClusterContext.Provider 
                value={{update, setUpdate, openAddClusterItemModal, setOpenAddClusterItemModal}}>
                {children}
            </ClusterContext.Provider>
        </>
    )
}

export default ClusterProvider;

