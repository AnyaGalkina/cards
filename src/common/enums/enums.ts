export enum ROUTES {
    PROFILE = "/profile",
    LOGIN = "/login",
    REGISTRATION = "/registration",
    PASSWORD_RECOVERY = "/password-recovery",
    SET_PASSWORD = "/set-new-password/:token",
    CHECK_EMAIL= "/check-email",
    PAGE_NOT_FOUND = "/404",
    CARDS = '/cards/card/', // :id
    PACKS = '/cards/pack',
    TEST = "/test",
    LEARN = '/learn/:packId'
}