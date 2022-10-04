import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../Modal";
import {Button, Checkbox, TextField} from "@mui/material";

type UpdateNameModalType = {
    updatePacksName: (packId: string, name: string) => void
    packId: string
    open: boolean
    setClose: () => void
}

export const UpdateNameModal = ({updatePacksName, open, setClose, packId}: UpdateNameModalType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const setPacksNameHandler = () => {
        if (title.trim() !== '') {
            updatePacksName(packId, title);
            setTitle('');
            setClose();
        } else {
            setError('Title is required');
        }
    }

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            setPacksNameHandler();
        }
    }

    return <>
        <BasicModal open={open} title={'Edit Pack'}>
            <div>
                <TextField variant={'outlined'}
                           value={title}
                           onChange={onChangeNameHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'New name'}/>
                <footer>
                    <Button variant="contained"
                            color='primary'
                            onClick={setPacksNameHandler}>
                        Save
                    </Button>
                    <Button variant="contained"
                            color='inherit'
                            onClick={setClose}>
                        Cancel
                    </Button>
                </footer>
            </div>
        </BasicModal>
    </>
}