import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL || "http://localhost:7542/2.0",
    withCredentials: true
});

export const packsAPI = {
    getPacks(page: number, pageCount: number, userID: string) {
        return instance.get<{ cardPacks: Array<RequestPacksType> }>(`/cards/pack?page=${page}&pageCount=${pageCount}&user_id=${userID}`)
    },
    addNewPack(name: string, isPrivate: boolean) {
        return instance.post<{ newCardsPack: RequestPacksType }>(`/cards/pack`, {
            cardsPack: {
                name,
                private: isPrivate
            }
        })
    },
    deletePack(packId: string) {
        return instance.delete<{ deletedCardsPack: RequestPacksType }>(`/cards/pack?id=${packId}`)
    },
    updatePackName(packId: string, newName: string) {
        return instance.put<{ updatedCardsPack: RequestPacksType }>(`/cards/pack`, {
            cardsPack: {
                _id: packId,
                name: newName
            }
        })
    }
};

export type RequestPacksType = {
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
}