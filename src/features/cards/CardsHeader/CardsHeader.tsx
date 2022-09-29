import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Create} from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import {addCardsTC} from "../cards-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import FadeMenu from "./FadeMenu/FadeMenu";

type CardsHeaderPropsType = {
    myProfile: boolean
    cardsPack_id: string | undefined
    packName: string
}

const CardsHeader: React.FC<CardsHeaderPropsType> = ({myProfile, cardsPack_id, packName}) => {
    const dispatch = useAppDispatch()

    const addCardHandler = () => {
        if (cardsPack_id) {
            dispatch(addCardsTC({card: {cardsPack_id, question: 'new question', answer: 'new answer'}}))
        }
    }

    const learnHandler = () => {
        alert('learning')
    }

    const headerBoxStyle = {
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '10px'}

    return (
        <Box>
            {myProfile ?
                (<Box sx={headerBoxStyle}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Typography variant="h5">
                                {packName}
                            </Typography>
                            <FadeMenu/>
                        </Box>
                        <Button variant={'contained'} color={'primary'} onClick={addCardHandler} endIcon={<Create/>}>
                            new card
                        </Button>
                    </Box>
                ) : (
                    <Box sx={headerBoxStyle}>
                        <Typography variant="h5">
                            {packName}
                        </Typography>
                        <Button variant={'contained'} color={'primary'} onClick={learnHandler} endIcon={<SchoolIcon/>}>
                            start learning
                        </Button>
                    </Box>
                )
            }
        </Box>
    );
};

export default CardsHeader;