import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BasicModal} from "../../Modal";
import {TextField, Typography} from "@mui/material";
import {BasicSelect} from "../basicSelect/BasicSelect";
import {InputTypeFile} from "../inputTypeFile/InputTypeFile";

type AddCardModalType = {
    addCard: (cardsPack_id: string, question?: string, answer?: string, questionImg?: string, answerImg?: string) => void
    cardsPack_id: string | undefined
    open: boolean
    setClose: () => void
}

export const AddCardModal = ({addCard, open, setClose, cardsPack_id}: AddCardModalType) => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [format, setFormat] = useState('Text');
    const [questionImg, setQuestionImage] = useState('');
    const [answerImg, setAnswerImage] = useState('');

    const setCardHandler = () => {
        if ((question.trim() !== '' && answer.trim() !== '')
            || (questionImg !== '' && answerImg !== '') ) {
            if (cardsPack_id) {
                addCard(cardsPack_id, question, answer, questionImg, answerImg);
                setQuestion('');
                setAnswer('');
                setClose();
                setQuestionImage('');
                setAnswerImage('');
            }
        } else {
            setError('Title is required');
        }
    }
    const onCancelClickHandler = () => {
        setClose();
        setError(null);
        setQuestion('');
        setAnswer('');
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
                    onCancelClickHandler={onCancelClickHandler}>
            <BasicSelect format={format} setFormat={setFormat}/>
            { format === 'Text' ?
                <>
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
                </> :
                <div style={{display:'flex', flexDirection: 'column', margin: '20px', gap: '20px'}}>
                    <Typography variant="button" color={error? 'red' : ''}>
                       upload image for:
                    </Typography>
                 <InputTypeFile title={'question'} image={questionImg} setImage={setQuestionImage}/>
                 <InputTypeFile title={'answer'} image={answerImg} setImage={setAnswerImage}  />
                </div>

            }

        </BasicModal>
    </>
}