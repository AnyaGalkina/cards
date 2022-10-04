import React, {ReactNode} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";

type BasicModalType = {
    children: ReactNode
    open: boolean
    title: string
}

export const BasicModal = ({children, open, title}: BasicModalType) => {

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
}