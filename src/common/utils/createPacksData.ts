export interface PackData {
    name: string;
    cardsCount: number;
    updated: string;
    createdBy: string;
    id: string;
    actions: string;
    userIdFromPack: string
}

export function createData(
    name: string,
    cardsCount: number,
    updated: string,
    createdBy: string,
    id: string,
    actions: string,
    userIdFromPack: string
): PackData {
    return {
        name,
        cardsCount,
        updated,
        createdBy,
        id,
        actions,
        userIdFromPack
    };
}