import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {setMaxValue, setMinValue} from "../../../common/components/search/filters-reducer";
import {Slider} from "@mui/material";
import s from "./NumOfCardsFilter.module.css";

export const NumOfCardsFilter = () => {
    const min = useAppSelector(state => state.filters.min);
    const max = useAppSelector(state => state.filters.max);
    const dispatch = useAppDispatch();
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(10)
    let value = [value1, value2];

    const onDoubleChangeHandler = (newValue: [number, number]) => {
        setValue1(newValue[0]);
        setValue2(newValue[1]);
    }

    const onChangeCommittedHandler = () => {
        dispatch(setMinValue({min: value1}));
        dispatch(setMaxValue({max: value2}));
    }

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>, newValue: number | number[]) => {
        onDoubleChangeHandler && onDoubleChangeHandler(newValue as [number, number]);
    };


    return (
        <div className={s.filterContainer}>
            <span>Number of cards</span>
            <div className={s.sliderContainer}>
                <span className={s.value}>{min}</span>
                <Slider
                    onChangeCommitted={onChangeCommittedHandler}
                    sx={{width: 155}}
                    value={value}
                    step={1}
                    min={min}
                    max={max}
                    //@ts-ignore
                    onChange={onChangeCallback}
                    valueLabelDisplay="auto"
                />
                <span className={s.value}>{max}</span>
            </div>
        </div>
    );
};

