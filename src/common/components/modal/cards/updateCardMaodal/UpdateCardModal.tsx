import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../../Modal";
import {TextField, Typography} from "@mui/material";
import {InputTypeFile} from "../inputTypeFile/InputTypeFile";

type UpdateCardModalType = {
    updateCard: (cardId: string, packId: string, question?: string, answer?: string, questionImg?: string, answerImg?: string) => void
    cardId: string
    packId: string | undefined
    question: string
    answer: string
    questionImg?: string
    answerImg?: string
    open: boolean
    setClose: () => void
}

export const UpdateCardModal = ({updateCard, open, setClose, packId, cardId, question, answer, questionImg, answerImg}: UpdateCardModalType) => {

    const [newQuestion, setNewQuestion] = useState(question);
    const [newAnswer, setNewAnswer] = useState(answer);
    const [error, setError] = useState<string | null>(null);
    const [newQuestionImg, setQuestionImage] = useState(questionImg);
    const [newAnswerImg, setAnswerImage] = useState(answerImg);

    const setCardHandler = () => {
        if (newQuestion.trim() !== '' && newAnswer.trim() !== ''
            || (questionImg !== '' && answerImg !== '')) {
            if (packId) {
                updateCard(cardId, packId, newQuestion, newAnswer, newQuestionImg, newAnswerImg);
                setNewQuestion(question);
                setNewAnswer(answer);
                setQuestionImage(questionImg)
                setAnswerImage(answerImg)
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
        setQuestionImage('')
        setAnswerImage('')
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

    const showTextField = questionImg === '' && answerImg === ''

    return <>
        <BasicModal open={open}
                    title={'Edit Card'}
                    buttonTitle={'Save'}
                    onSaveDeleteClickHandler={setCardHandler}
                    onCancelClickHandler={onCancelClickHandler}>

                { showTextField ?
                    <>
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
                    </>
                    :
                    <div style={{display:'flex', flexDirection: 'column', margin: '20px', gap: '20px'}}>
                    <Typography variant="button" color={error? 'red' : ''}>
                    change image for:
                    </Typography>
                    <InputTypeFile title={'question'} image={newQuestionImg} setImage={setQuestionImage}/>
                    <InputTypeFile title={'answer'} image={newAnswerImg} setImage={setAnswerImage}  />
                    </div>

                }

        </BasicModal>
    </>
}