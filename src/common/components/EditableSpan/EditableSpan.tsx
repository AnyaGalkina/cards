import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import s from './EditableSpan.module.css'
import {Box} from "@mui/material";

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

    return <Box  sx={{display: 'flex', alignItems: 'flex-end'}} >
        { editMode
            ? <TextField id="standard-basic" label={props.label} variant="standard" value={title} onChange={changeTitle}
                         autoFocus onBlur={activateViewMode} disabled={props.disabled} className={s.text}/>
            : <span onDoubleClick={activateEditMode} className={s.span}>{props.value}</span>
        }
   </Box>
});
