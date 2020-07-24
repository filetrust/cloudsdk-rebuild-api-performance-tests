import React from "react";
import Modal from "../common/Modal/Modal";

import Header from "./Header";
import Body from "./Body";
import CloseButton from "./CloseButton";

export interface ApiKeyModalProps {
    isOpen: boolean,
    onClickInside?: Function,
    onCloseAction: Function,
    submitFunction: Function
};

const ApiKeyModal = (props: ApiKeyModalProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClickInside={() => { }}
            onClickOutside={props.onCloseAction}>

            <Header />
            <Body submitFunction={props.submitFunction}/>

            <CloseButton closeAction={props.onCloseAction} />
        </Modal>
    );
};

export default ApiKeyModal;