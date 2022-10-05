import React, {useEffect, useState} from "react";
import {Button, Grid, Paper, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {getCard} from "../../../common/utils/cardsSmartRandom";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {ResCardType} from "../cardsAPI";
import {useNavigate, useParams} from "react-router-dom";
import {Answer} from "./answer/Answer";
import s from "./Learn.module.css";
import {changeGradeTC, setCardsPageCount} from "../cards-reducer";
import {defaultFilterValues, removeAllFilters} from "../../packs/packs-reducer";

export const Learn = () => {
    const allCards = useAppSelector(state => state.cards.cardsState.cards);
    const packName = useAppSelector(state => state.cards.cardsState.packName);
    const dispatch = useAppDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const [card, setCard] = useState<ResCardType>({} as ResCardType);
    const [cardsToLearn, setCardsToLearn] = useState<ResCardType[]>(allCards);
    const navigate = useNavigate();

    const {packId} = useParams()

    const showAnswerHandler = () => {
        setIsChecked(true);
    }

    const onGradeClickHandler = (grade:number) => {
        dispatch(changeGradeTC({grade, card_id: card._id}));
    }

    const onNextClickHandler = () => {
        setCardsToLearn(cardsToLearn.filter(c => c._id !== card?._id));
        setIsChecked(false);
    }

    useEffect(() => {
        setCard(getCard(cardsToLearn));
    }, []);

    useEffect(() => {
        if (cardsToLearn.length > 0) {
            setCard(getCard(cardsToLearn));
        } else {
            dispatch(removeAllFilters(defaultFilterValues));
            // navigate(ROUTES.PACKS);
            navigate(`/cards/card/${packId}`);
            dispatch(setCardsPageCount({pageCount: 5}));
        }
    }, [cardsToLearn]);

    return (
        <Grid container style={{padding: "10px"}} justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <Button href={"#/cards/pack"} color={"primary"} startIcon={<ArrowBackIcon/>}>
                    Back to Packs
                </Button>
                <h2>Learn "{packName}"</h2>
                <Paper style={{padding: "20px"}} className={s.paper}>
                    <Typography>
                        <span className={s.subTitle}>Question:</span> {card.question!}
                    </Typography>
                    <Typography className={s.shots}>You've already tried {card.shots!} times</Typography>
                {isChecked
                    ? <Answer answer={card.answer!} onNextClickHandler={onNextClickHandler} onGradeClickHandler={onGradeClickHandler} />
                    : <Button style={{width: "100%", marginTop: '10px'}} onClick={showAnswerHandler} variant={"contained"} color={"primary"}>
                        Show answer
                    </Button>
                }
                </Paper>
            </Grid>
        </Grid>
    );
};

