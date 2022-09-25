import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: process.env.REACT_APP_URL || "http://localhost:7542/2.0",
    withCredentials: true
})

export const cardsAPI = {
    getCards(params: CardQueryParamsType) {
        return instance.get<AxiosResponse<ResGetCardsType>>("/cards/card", {params});
    },
    createCard(data: NewCardType) {
        return instance.post<NewCardType>("/cards/card", data);
    },
    deleteCard(cardID: string) {
        return instance.delete<AxiosResponse<ResDeletedCardType>>(`/cards/card?id=${cardID}`)
    },
    updateCard(data: UpdatedCardType) {
        return instance.put<AxiosResponse<ResUpdatedCardType>>('/cards/card', data)
    }
}

export type CardQueryParamsType = {
    cardsPack_id: string;
    cardQuestion?: string;
    cardAnswer?: string;
    sortCards?: string;
    page?: number;
    pageCount?: number;
};

type ResGetCardsType = {
    cards: ResCardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

type CardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

type ResCardType = CardType &
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

type NewCardType = {
    card: CardType
}

type UpdatedCardType = {
    card: CardType & { _id: string, comments?: string }
}

export type ResUpdatedCardType = {
    updatedCard: ResCardType
}

export type ResDeletedCardType = {
    deletedCard: ResCardType
}
