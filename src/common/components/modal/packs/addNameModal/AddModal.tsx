import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../../Modal";
import {Checkbox, TextField, Typography} from "@mui/material";

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

    const onCancelClickHandler = () => {
        setClose();
        setError(null);
        setTitle('');
        setPrivacy(false);
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
        <BasicModal open={open}
                    title={'Add new Pack'}
                    buttonTitle={'Save'}
                    onSaveDeleteClickHandler={setPacksNameHandler}
                    onCancelClickHandler={onCancelClickHandler}>
            <div>
                <TextField variant={'outlined'}
                           value={title}
                           onChange={onChangeNameHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'Pack name'}/>
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Checkbox name={'Private pack'}
                              value={isPrivate}
                              onChange={onChangePrivacyHandler}/>
                    <Typography variant={'subtitle1'}>
                        Private pack
                    </Typography>
                </div>
            </div>
        </BasicModal>
    </>
}