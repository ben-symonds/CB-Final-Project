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
                        {backgroundColor: '#000',
                        color: '#fff'}
                        : {backgroundColor: '#fff',
                        color: '#000'}
                    }
                > 
                    add a link 
                </StyledButton>
                <Divider />
                
                <StyledButton
                    onClick={() => {
                        setOpenAddImageModal(!openAddImageModal);
                        setOpenAddVideoModal(false);
                        setOpenAddTextModal(false);
                        setOpenAddLinkModal(false);
                    }} 
                    style={
                        openAddImageModal ?
                        {backgroundColor: '#000',
                        color: '#fff'}
                        : {backgroundColor: '#fff',
                        color: '#000'}
                    }
                > 
                    upload an image 
                </StyledButton>
                <Divider />

                
                
                <StyledButton
                    onClick={() => {
                        setOpenAddTextModal(!openAddTextModal);
                        setOpenAddVideoModal(false);
                        setOpenAddLinkModal(false);
                        setOpenAddImageModal(false);
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
                </StyledButton>
                <Divider />
                
                <StyledButton
                    onClick={() => {
                        setOpenAddVideoModal(!openAddVideoModal);
                        setOpenAddTextModal(false);
                        setOpenAddLinkModal(false);
                        setOpenAddImageModal(false);

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
    margin-bottom: 10px;
`
const StyledButton = styled.button `
    width: 130px;
`
const Divider = styled.div `
    width:1px;
    background-color: black;
    height: 100%;
`

export default AddClusterItem;