import axios from "axios";
import {PackParamsType} from "./packs-reducer";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL || "http://localhost:7542/2.0",
    withCredentials: true
});

export const packsAPI = {
    getPacks(params: PackParamsType) {
        return instance.get<RequestPacksType & { cardPacks: Array<PacksType> }>(`/cards/pack`, {params})
    },
    addNewPack(name: string, isPrivate: boolean, deckCover: string) {
        return instance.post<{ newCardsPack: Array<PacksType> }>(`/cards/pack`, {
            cardsPack: {
                name,
                private: isPrivate,
                deckCover
            }
        })
    },
    deletePack(packId: string) {
        return instance.delete<{ deletedCardsPack: Array<PacksType> }>(`/cards/pack?id=${packId}`)
    },
    updatePackName(packId: string, newName: string, deckCover: string) {
        return instance.put<{ updatedCardsPack: Array<PacksType> }>(`/cards/pack`, {
            cardsPack: {
                _id: packId,
                name: newName,
                deckCover
            }
        })
    }
};

export type PacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string //need to figure out the date type
    updated: string
    more_id: string
    __v: number
    deckCover?: string
}
export type RequestPacksType = {
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}