import React, {ChangeEvent, useCallback, useState} from "react";
import s from "../profile-page/Profile.module.css";
import avatar from "../../../assets/images/avatar/user.png";
import {UploadAvatarInput} from "./UploadAvatarInput/UploadAvatarInput";
import {updateAvatarAC, updateUserTC} from "../profile-page/profile-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";

type PropsType = {
    userAvatar?: string;
}

export const ProfileAvatar = ({userAvatar}: PropsType) => {
    const dispatch = useAppDispatch();
    const [isAvaBroken, setIsAvaBroken] = useState(false);

    const convertFileToBase64 = (
        file: File,
        callBack: (value: string) => void
    ) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string;
            callBack(file64);
        }
        reader.readAsDataURL(file);
    }

    const uploadHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            setIsAvaBroken(false);
            const file = e.target.files[0];
            if (file.size < 4000000) {
                convertFileToBase64(file,
                    // async
                (file64: string) => {
                   //  debugger
                   // await dispatch(updateAvatarAC(file64));
                   dispatch(updateUserTC({avatar: file64}));
                });
            } else {
                errorHandler();
            }
        }
    }, [dispatch]);


    const errorHandler = () => {
        setIsAvaBroken(true);
    }

    return (
        <div className={s.avatarContainer}>
            <img className={s.avatar} src={userAvatar ? userAvatar : avatar} alt={"avatar"}/>
            <UploadAvatarInput uploadHandler={uploadHandler} />
            <div className={s.error}>{isAvaBroken ? "image size is too big or broken. Try another one" : ""}</div>
        </div>
    );
};
