import React, {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {Create} from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import {addCardsTC, getCardsTC, setCardsPageCount} from "../cards-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {FadeMenu} from "./FadeMenu/FadeMenu";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {AddCardModal} from "../../../common/components/modal/cards/addCardModal/AddCardModal";

type CardsHeaderPropsType = {
    myProfile: boolean
    cardsPack_id: string
    packName: string
}

export const CardsHeader: React.FC<CardsHeaderPropsType> = ({myProfile, cardsPack_id, packName}) => {
    const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //State for Add Card Modal
    const [open, setOpen] = useState(false);
    const openModalHandler = () => setOpen(true);
    const closeModalHandler = () => setOpen(false);

    const addCardHandler = (cardsPack_id: string, question?: string, answer?: string, questionImg?: string, answerImg?: string) => {
        if (cardsPack_id) {
            dispatch(addCardsTC({card: {cardsPack_id, question, answer, questionImg, answerImg}}))
        }
    }

    const learnHandler = () => {
        if (cardsPack_id) {
            dispatch(setCardsPageCount({pageCount: cardsTotalCount}));
            dispatch(getCardsTC(cardsPack_id));
            navigate(`/learn/${cardsPack_id}`);
        }
    }

    const headerBoxStyle = {
        display: "flex", justifyContent: "space-between", margin: "10px", width: '70%'
    }

    return (
        <Box sx={{width: '100%', display: "flex", justifyContent: "center"}}>
            {myProfile ?
                (<Box sx={headerBoxStyle}>
                        <Box sx={{display: "flex"}}>
                            <Typography variant="h5">
                                {packName}
                            </Typography>
                            <FadeMenu learnHandler={learnHandler}
                                      packId={cardsPack_id} packName={packName} // ?????? ?????????????? ???????????????? ?? ??????????????
                            />
                        </Box>
                        <AddCardModal addCard={addCardHandler}
                                      cardsPack_id={cardsPack_id}
                                      open={open}
                                      setClose={closeModalHandler}/>
                        <Button variant={"contained"} color={"primary"} onClick={openModalHandler} endIcon={<Create/>}>
                            new card
                        </Button>

                    </Box>
                ) : (
                    <Box sx={headerBoxStyle}>
                        <Typography variant="h5">
                            {packName}
                        </Typography>
                        <Button variant={"contained"} color={"primary"} onClick={learnHandler} endIcon={<SchoolIcon/>}>
                            start learning
                        </Button>
                    </Box>
                )
            }
        </Box>
    );
};