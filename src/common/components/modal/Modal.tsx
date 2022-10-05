import React, {ReactNode} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import style from './Modal.module.css'

type BasicModalType = {
    children: ReactNode
    open: boolean
    title: string
    onSaveDeleteClickHandler: () => void
    onCancelClickHandler: () => void
    buttonTitle: string
}

export const BasicModal = (props: BasicModalType) => {

    const {children, open, title, onSaveDeleteClickHandler, onCancelClickHandler, buttonTitle} = props;

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>
                    <Typography variant={'h6'}>
                        {title}
                    </Typography>
                </DialogTitle>
                <DialogContent style={{padding: '20px'}} dividers>
                    <>
                        {children}
                        <div className={style.buttonsBlock}>
                            <Button
                                variant="contained"
                                color='primary'
                                onClick={onSaveDeleteClickHandler}>
                                {buttonTitle}
                            </Button>
                            <Button
                                variant="contained"
                                color='inherit'
                                onClick={onCancelClickHandler}>
                                Cancel
                            </Button>
                        </div>
                    </>
                </DialogContent>
            </Dialog>
        </div>
    );
}