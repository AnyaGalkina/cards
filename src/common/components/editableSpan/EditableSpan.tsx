import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import s from './EditableSpan.module.css'
import {Box} from "@mui/material";
import {Create} from "@mui/icons-material";

type EditableSpanPropsType = {
    value: string
    label?: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressChangeTitle = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            activateViewMode()
        }
    }

    return <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '3'}}>
        {editMode
            ? <TextField id="standard-basic" label={props.label} variant="standard" value={title} onChange={changeTitle}
                         autoFocus onBlur={activateViewMode} disabled={props.disabled} className={s.text} onKeyPress={onKeyPressChangeTitle}/>
            : <div className={s.span}>
                <span onDoubleClick={activateEditMode} >{props.value}</span>
                <Create sx={{ color: 'action.active', ml: 1, my: -1 }} onDoubleClick={activateEditMode}/>
            </div>
        }
    </Box>

});
