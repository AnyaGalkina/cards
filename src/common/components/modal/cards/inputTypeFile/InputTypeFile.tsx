import React, {ChangeEvent} from 'react';
import {Button} from '@mui/material';
import s from './InputTypeFile.module.css'

type PropsType = {
    title: string
    image: string
    setImage: (image: string) => void
}


export const InputTypeFile: React.FC<PropsType> = ({title, setImage, image}) => {

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setImage(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }


    const convertFileToBase64 = (
        file: File,
        callBack: (value: string) => void
    ) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }


    return (
        <div className={s.container}>
            <Button component="label" size={'large'} variant={"contained"} color={"primary"}>
                {title}
                <input hidden accept="image/*" multiple type="file" onChange={uploadHandler}/>
            </Button>
            <div className={s.imgContainer}>
                {
                    image ?
                    <img
                        src={image}
                        style={{width: '100px'}}
                        alt={title}
                    />
                    : null
                }
            </div>
        </div>
    )
}
