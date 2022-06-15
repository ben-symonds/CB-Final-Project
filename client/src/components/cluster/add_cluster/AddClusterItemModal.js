import { useState } from 'react';
import styled from 'styled-components';

import AddLinkModal from './AddLinkModal';
import AddVideoModal from './AddVideoModal';
import AddTextModal from './AddTextModal';
import AddImageModal from './AddImageModal';

const AddClusterItem = () => {

    const [ openAddVideoModal, setOpenAddVideoModal ] = useState(false);
    const [ openAddLinkModal, setOpenAddLinkModal ] = useState(false);
    const [ openAddTextModal, setOpenAddTextModal ] = useState(false);
    const [ openAddImageModal, setOpenAddImageModal ] = useState(false);

    return (
        <>
            <Wrapper>
                <StyledButton
                    onClick={() => {
                        setOpenAddLinkModal(!openAddLinkModal);
                        setOpenAddTextModal(false);
                        setOpenAddVideoModal(false);
                        setOpenAddImageModal(false);
                    }}
                    style={
                        openAddLinkModal ?
                        {backgroundColor: '#202121',
                        color: '#fff'}
                        : {backgroundColor: '#fff',
                        color: '#202121'}
                    }
                > 
                    add a link 
                </StyledButton>
                
                <StyledButton
                    onClick={() => {
                        setOpenAddImageModal(!openAddImageModal);
                        setOpenAddVideoModal(false);
                        setOpenAddTextModal(false);
                        setOpenAddLinkModal(false);
                    }} 
                    style={
                        openAddImageModal ?
                        {backgroundColor: '#202121',
                        color: '#fff'}
                        : {backgroundColor: '#fff',
                        color: '#202121'}
                    }
                > 
                    upload an image 
                </StyledButton>
                
                <StyledButton
                    onClick={() => {
                        setOpenAddTextModal(!openAddTextModal);
                        setOpenAddVideoModal(false);
                        setOpenAddLinkModal(false);
                        setOpenAddImageModal(false);
                    }} 
                    style={
                        openAddTextModal ?
                        {backgroundColor: '#202121',
                        color: '#fff'}
                        : {backgroundColor: '#fff',
                        color: '#202121'}
                    }
                >   
                    add text 
                </StyledButton>

                <StyledButton
                    onClick={() => {
                        setOpenAddVideoModal(!openAddVideoModal);
                        setOpenAddTextModal(false);
                        setOpenAddLinkModal(false);
                        setOpenAddImageModal(false);

                    }}
                    style={
                        openAddVideoModal ?
                        {backgroundColor: '#202121',
                        color: '#fff'}
                        : {backgroundColor: '#fff',
                        color: '#202121'}
                    }
                > 
                    add media 
                </StyledButton>
                
            </Wrapper>
            {openAddLinkModal && <AddLinkModal />}
            {openAddImageModal && <AddImageModal />}
            {openAddVideoModal && <AddVideoModal />}
            {openAddTextModal && <AddTextModal />}
        </>
    )

}

const Wrapper = styled.div `
    display: flex;
    justify-content: center;
    width: 550px;
`
const StyledButton = styled.button `
    width: 140px;
    padding: 5px;
    border: 1px lightgray solid;
`

export default AddClusterItem;