import axios, {AxiosResponse} from "axios";
import {SortCardsType} from "./cards-reducer";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL || "http://localhost:7542/2.0",
    withCredentials: true
})

export const cardsAPI = {
    getCards(params: CardQueryParamsType) {
        return instance.get<ResGetCardsType>("/cards/card", {params})
    },
    createCard(data: NewCardType) {
        return instance.post<NewCardType>("/cards/card", data);
    },
    deleteCard(cardID: string) {
        return instance.delete<AxiosResponse<ResDeletedCardType>>(`/cards/card?id=${cardID}`)
    },
    updateCard(card: UpdatedCardType) {
        return instance.put<AxiosResponse<ResUpdatedCardType>>('/cards/card', {card})
    },
    changeGrade(data: UpdatedGradeType) {
        return instance.put<AxiosResponse<ResUpdatedGradeType>>('/cards/grade', data)
    }
}

export type CardQueryParamsType = {
    cardsPack_id: string;
    cardQuestion?: string;
    cardAnswer?: string;
    sortCards?:  SortCardsType;
    page: number;
    pageCount?: number;
    search?: string;
};

export type ResGetCardsType = {
    cards: ResCardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    packName: string
    packDeckCover?: string
}

export type CardType = {
    cardsPack_id?: string // для создания обязательна
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type ResCardType = CardType &
    {
        _id: string;
        user_id: string;
        comments: string;
        type: string;
        rating: number;
        more_id: string;
        created: string;
        updated: string;
        __v: number;

    }

export type NewCardType = {
    card: CardType
}

export type UpdatedCardType = CardType & { _id: string, comments?: string}

export type ResUpdatedCardType = {
    updatedCard: ResCardType
}

export type ResDeletedCardType = {
    deletedCard: ResCardType
}

export type ResUpdatedGradeType = {
    updatedGrade: UpdatedGradeType & {
        _id: string
        cardsPack_id: string
        user_id: string
        shots: number }
}

export type UpdatedGradeType = {
    grade:  number
    card_id: string
}
