import React, {useEffect} from "react";
import {Header} from "../../common/components/header/Header";
import {useSelector} from "react-redux";
import {initializeAppTC, RequestStatusType} from "../../app/app-reducer";
import {AppRootState} from "../../app/store";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../../common/components/error/ErrorSnackbar";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {Footer} from "../../common/components/footer/Footer";
import {RoutesComponent} from "./Routes";
import s from "./Main.module.css";


const Main = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized);
    const appStatus = useSelector<AppRootState, RequestStatusType>(state => state.app.status);

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    if (!isInitialized) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={s.mainContainer}>
            <div>
                <Header/>
                {appStatus === "loading" && <LinearProgress/>}
            </div>
            <ErrorSnackbar/>
            <RoutesComponent/>
            <Footer/>
        </div>
    );
};

export default Main;