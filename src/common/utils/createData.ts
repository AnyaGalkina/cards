export interface PackData {
    name: string;
    cardsCount: number;
    updated: string;
    createdBy: string;
    id: string;
    actions: string;
    userIdFromPack: string;
    deckCover: string | undefined;
}

export function createPacksData(
    name: string,
    cardsCount: number,
    updated: string,
    createdBy: string,
    id: string,
    actions: string,
    userIdFromPack: string,
    deckCover: string | undefined
): PackData {
    return {
        name,
        cardsCount,
        updated,
        createdBy,
        id,
        actions,
        userIdFromPack,
        deckCover
    };
}

export interface CardsData {
    question: string | undefined,
    questionImg: string | undefined,
    answer: string | undefined,
    answerImg: string | undefined,
    updated: string
    grade: number | undefined
    cardId: string
    cardsPack_id: string
    actions: string
}
export function createCardsData(
    question: string | undefined,
    questionImg: string | undefined,
    answer: string | undefined,
    answerImg: string | undefined,
    updated: string,
    grade: number | undefined,
    cardId: string,
    cardsPack_id: string,
    actions: string
): CardsData {
    return <CardsData> {
        question,
        questionImg,
        answer,
        answerImg,
        updated,
        grade,
        cardId,
        cardsPack_id,
        actions
    };
}
