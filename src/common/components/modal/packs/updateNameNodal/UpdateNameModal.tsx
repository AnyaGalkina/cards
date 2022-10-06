import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../../Modal";
import {TextField} from "@mui/material";

type UpdateNameModalType = {
    updatePacksName: (packId: string, name: string) => void
    packId: string
    packName: string
    open: boolean
    setClose: () => void
}

export const UpdateNameModal = (props: UpdateNameModalType) => {

    const {updatePacksName, open, setClose, packId, packName} = props;

    const [newPackName, setNewPackName] = useState(packName);
    const [error, setError] = useState<string | null>(null);

    const setPacksNameHandler = () => {
        if (newPackName.trim() !== '') {
            updatePacksName(packId, newPackName);
            setNewPackName(packName);
            setClose();
        } else {
            setError('Title is required');
        }
    }

    const onCancelClickHandler = () => {
        setClose();
        setError(null);
        setNewPackName('');
    }

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value)
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
                    title={'Edit Pack'}
                    buttonTitle={'Save'}
                    onSaveDeleteClickHandler={setPacksNameHandler}
                    onCancelClickHandler={onCancelClickHandler}>
            <div>
                <TextField variant={'outlined'}
                           value={newPackName}
                           onChange={onChangeNameHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'New name'}/>
            </div>
        </BasicModal>
    </>
}