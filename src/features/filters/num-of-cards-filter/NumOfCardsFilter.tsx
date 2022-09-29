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
    const appStatus= useAppSelector(state => state.app.status);
    const dispatch = useAppDispatch();
    const [value1, setValue1] = useState(min)
    const [value2, setValue2] = useState(max)
    let value = useMemo(() => {return [value1, value2]}, [value1, value2])

    const debouncedValue = useDebounce<number[]>(value, 1000);

    useEffect(() => {
        dispatch(setMinValue({min: value1}));
        dispatch(setMaxValue({max: value2}));
    }, [debouncedValue])

    useEffect(() => {
        setValue1(min)
        setValue2(max)
    }, [min, max])

    const onDoubleChangeHandler = (newValue: [number, number]) => {
        setValue1(newValue[0]);
        setValue2(newValue[1]);
    }


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>, newValue: number | number[]) => {
        onDoubleChangeHandler && onDoubleChangeHandler(newValue as [number, number]);
    };


    return (
        <div className={sContainer.filterContainer}>
            <span>Number of cards</span>
            <div className={s.sliderContainer}>
                <span className={s.value}>{min}</span>
                <Slider
                    disabled={appStatus === "loading"}
                    sx={{width: 155}}
                    value={value}
                    step={1}
                    min={0}
                    //max from server???
                    max={10}
                    //@ts-ignore
                    onChange={onChangeCallback}
                    valueLabelDisplay="auto"
                />
                <span className={s.value}>{max}</span>
            </div>
        </div>
    );
};

