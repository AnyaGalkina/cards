import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {Slider} from "@mui/material";
import s from "./NumOfCardsFilter.module.css";
import {setMaxValue, setMinValue} from "../../packs/packs-reducer";
import sContainer from "../PacksFilters.module.css";
import {useDebounce} from "../../../common/hooks/useDebounce";

export const NumOfCardsFilter = () => {
    const min = useAppSelector(state => state.packs.params.min);
    const max = useAppSelector(state => state.packs.params.max);
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
    const appStatus = useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const [isFirstSearchReq, setIsFirstSearchReq] = useState(false);
    const [value1, setValue1] = useState(min);
    const [value2, setValue2] = useState(maxCardsCount);

    let value = useMemo(() => {
        return [value1, value2]
    }, [value1, value2])

    const debouncedValue = useDebounce<any>(value, 1000);

    const onDoubleChangeHandler = (newValue: [number, number]) => {
        setValue1(newValue[0]);
        setValue2(newValue[1]);
        setIsFirstSearchReq(true);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, newValue: number | number[]) => {
        onDoubleChangeHandler && onDoubleChangeHandler(newValue as [number, number]);
    };

    useEffect(() => {
        setValue2(maxCardsCount)
    }, [maxCardsCount])

    useEffect(() => {
        if(isFirstSearchReq){
            dispatch(setMinValue({min: value1}));
            dispatch(setMaxValue({max: value2}));
        }
    }, [debouncedValue])

    useEffect(() => {
        setValue1(min)
        setValue2(max)
    }, [min, max])

    return (
        <div className={sContainer.filterContainer}>
            <span>Number of cards</span>
            <div className={s.sliderContainer}>
                <span className={s.value}>{min}</span>
                <Slider
                    disabled={appStatus === "loading"}
                    sx={{width: 155}}
                    value={[value1, value2]}
                    step={1}
                    min={0}
                    max={maxCardsCount}
                    //@ts-ignore
                    onChange={onChangeHandler}
                    valueLabelDisplay="auto"
                />
                <span className={s.value}>{maxCardsCount}</span>
            </div>
        </div>
    );
};

