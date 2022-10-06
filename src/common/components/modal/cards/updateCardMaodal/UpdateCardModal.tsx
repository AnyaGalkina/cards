import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../../Modal";
import {TextField} from "@mui/material";

type UpdateCardModalType = {
    updateCard: (cardId: string, packId: string, question: string, answer: string) => void
    cardId: string
    packId: string | undefined
    question: string
    answer: string
    open: boolean
    setClose: () => void
}

export const UpdateCardModal = ({updateCard, open, setClose, packId, cardId, question, answer}: UpdateCardModalType) => {

    const [newQuestion, setNewQuestion] = useState(question);
    const [newAnswer, setNewAnswer] = useState(answer);
    const [error, setError] = useState<string | null>(null);

    const setCardHandler = () => {
        if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
            if (packId) {
                updateCard(cardId, packId, newQuestion, newAnswer);
                setNewQuestion(question);
                setNewAnswer(answer);
                setClose();
            }
        } else {
            setError('Title is required');
        }
    }

    const onCancelClickHandler = () => {
        setClose();
        setError(null);
        setNewQuestion('');
        setNewAnswer('');
    }

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value)
    }
    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(e.currentTarget.value)
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
                    title={'Edit Card'}
                    buttonTitle={'Save'}
                    onSaveDeleteClickHandler={setCardHandler}
                    onCancelClickHandler={onCancelClickHandler}>
            <div style={{margin: '20px'}}>
                <TextField variant={'outlined'}
                           value={newQuestion}
                           onChange={onChangeQuestionHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'Question'}/>
            </div>
            <div style={{margin: '20px'}}>
                <TextField variant={'outlined'}
                           value={newAnswer}
                           onChange={onChangeAnswerHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           helperText={error}
                           label={'Answer'}/>
            </div>
        </BasicModal>
    </>
}