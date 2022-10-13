import React, {ChangeEvent, useRef, useState} from "react";
import style from "../../../Modal.module.scss";
import {Button, Typography} from "@mui/material";
import teachLogo from "../../../../../../assets/images/teach-me-logo.jpg"

type AddPackCoverType = {
    file64: string
    setFile64: (file: string) => void
}

export const AddPackCover = (props: AddPackCoverType) => {
    const inRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File>();
    const [base64, setBase64] = useState(true); // base64 - true, text - false

    const upload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        const newFile = e.target.files && e.target.files[0];

        if (newFile) {
            setFile(newFile);
            reader.onloadend = () => {
                // @ts-ignore
                props.setFile64(reader.result ? reader.result : '');
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
            <img src={props.file64 ? props.file64 : teachLogo} alt={'file'} width={'100%'} height={'150px'}/>
            <input
                ref={inRef}
                type={'file'}
                style={{display: 'none'}}
                onChange={upload}
            />
        </div>
    </div>

}