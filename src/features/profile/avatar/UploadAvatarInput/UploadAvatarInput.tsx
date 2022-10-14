import React, {ChangeEvent, memo} from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import s from "./UploadAvatarInput.module.css";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";

type PropsType = {
    uploadHandler: (e: ChangeEvent<HTMLInputElement>) => void
}


export const UploadAvatarInput = memo(({uploadHandler}: PropsType) => {
    const status = useAppSelector(state => state.app.status);

    return (
        <div className={s.uploadPhotoContainer} >
            <IconButton  disabled={status === "loading"} size="small" style={{backgroundColor: "#bbb9b9"}} aria-label="upload picture" component="label" >
                <input hidden accept="image/*" type="file" onChange={uploadHandler}/>
                <PhotoCamera />
            </IconButton>
        </div>
    );
})
