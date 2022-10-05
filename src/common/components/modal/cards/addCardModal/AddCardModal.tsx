import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../../Modal";
import {TextField} from "@mui/material";

type AddCardModalType = {
    addCard: (cardsPack_id: string, question: string, answer: string) => void
    cardsPack_id: string | undefined
    open: boolean
    setClose: () => void
}

export const AddCardModal = ({addCard, open, setClose, cardsPack_id}: AddCardModalType) => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState<string | null>(null);

    const setCardHandler = () => {
        if (question.trim() !== '' && answer.trim() !== '') {
            if (cardsPack_id) {
                addCard(cardsPack_id, question, answer);
                setQuestion('');
                setAnswer('');
                setClose();
            }
        } else {
            setError('Title is required');
        }
    }

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            setCardHandler();
        }
    }

    return <>
        <BasicModal open={open}
                    title={'Add new Card'}
                    buttonTitle={'Save'}
                    onSaveDeleteClickHandler={setCardHandler}
                    onCancelClickHandler={setClose}>
            <div style={{margin: '20px'}}>
                <TextField variant={'outlined'}
                           value={question}
                           onChange={onChangeQuestionHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'Question'}/>
            </div>
            <div style={{margin: '20px'}}>
                <TextField variant={'outlined'}
                           value={answer}
                           onChange={onChangeAnswerHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'Answer'}/>
            </div>
        </BasicModal>
    </>
}