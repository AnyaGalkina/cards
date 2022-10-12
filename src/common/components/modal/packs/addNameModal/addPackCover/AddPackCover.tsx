import React, {ChangeEvent, useRef, useState} from "react";
import style from "../../../Modal.module.scss";
import {Button, Typography} from "@mui/material";
import teachLogo from "../../../../../../assets/images/teach-me-logo.jpg"

export const AddPackCover = () => {
    const inRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File>();
    const [file64, setFile64] = useState(teachLogo);
    const [fileData, setFileData] = useState<FormData>();
    const [base64, setBase64] = useState(true); // base64 - true, text - false

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const formData = new FormData(); // for send to back

        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            setFile(newFile);
            formData.append('myFile', newFile, newFile.name);
            setFileData(formData);
            reader.onloadend = () => {
                // @ts-ignore
                setFile64(reader.result);
            };

            if (base64) reader.readAsDataURL(newFile);
            else reader.readAsText(newFile);
        }
    };

    return <div className={style.coverBlock}>
        <div className={style.coverButtonBlock}>
            <Typography variant={'h6'}>
                Cover
            </Typography>
            <Button variant={'outlined'} onClick={() => inRef && inRef.current && inRef.current.click()}>
                Upload image
            </Button>
        </div>
        <div className={style.coverImageBlock}>
            <img src={file64} alt={'file'} width={'100%'} height={'150px'}/>
            <input
                ref={inRef}
                type={'file'}
                style={{display: 'none'}}
                onChange={upload}
            />
        </div>
    </div>

}