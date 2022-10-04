import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../Modal";
import {Button, Checkbox, TextField} from "@mui/material";

type AddModalType = {
    addPack: (name: string, isPrivate: boolean) => void
    open: boolean
    setClose: () => void
}

export const AddModal = ({addPack, open, setClose}: AddModalType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isPrivate, setPrivacy] = useState<boolean>(false)

    const setPacksNameHandler = () => {
        if (title.trim() !== '') {
            addPack(title, isPrivate);
            setTitle('');
            setPrivacy(false);
            setClose();
        } else {
            setError('Title is required');
        }
    }

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangePrivacyHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPrivacy(e.currentTarget.checked)
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
        <BasicModal open={open} title={'Add new Pack'}>
            <div>
                <TextField variant={'outlined'}
                           value={title}
                           onChange={onChangeNameHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'Pack name'}/>
                <div>
                    <Checkbox name={'Private pack'}
                              value={isPrivate}
                              onChange={onChangePrivacyHandler}/>
                    Private Pack
                </div>
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