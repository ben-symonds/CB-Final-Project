import { useState } from 'react';
import AddLinkModal from './AddLinkModal';
import AddVideoModal from './AddVideoModal';
import AddTextModal from './AddTextModal';

const AddClusterItem = () => {

    const [ openAddVideoModal, setOpenAddVideoModal ] = useState(false);
    const [ openAddLinkModal, setOpenAddLinkModal ] = useState(false);
    const [ openAddTextModal, setOpenAddTextModal ] = useState(false);

    return (
        <>
            <button 
                onClick={() => {
                    setOpenAddLinkModal(!openAddLinkModal);
                    setOpenAddTextModal(false);
                    setOpenAddVideoModal(false);
                }}
                style={
                    openAddLinkModal ?
                    {backgroundColor: '#000',
                    color: '#fff'}
                    : {backgroundColor: '#fff',
                    color: '#000'}
                }
            > 
                add a link 
            </button>
            {openAddLinkModal && <AddLinkModal />}
            <button> upload an image </button>
            <button
                onClick={() => {
                    setOpenAddTextModal(!openAddTextModal);
                    setOpenAddVideoModal(false);
                    setOpenAddLinkModal(false);
                }} 
                style={
                    openAddTextModal ?
                    {backgroundColor: '#000',
                    color: '#fff'}
                    : {backgroundColor: '#fff',
                    color: '#000'}
                }
            >   
                add some text 
            </button>
            {openAddTextModal && <AddTextModal />}
            <button
                onClick={() => {
                    setOpenAddVideoModal(!openAddVideoModal);
                    setOpenAddTextModal(false);
                    setOpenAddLinkModal(false);

                }}
                style={
                    openAddVideoModal ?
                    {backgroundColor: '#000',
                    color: '#fff'}
                    : {backgroundColor: '#fff',
                    color: '#000'}
                }
            > 
                add a video 
            </button>
            {openAddVideoModal && <AddVideoModal />}
        </>
    )
}

export default AddClusterItem;