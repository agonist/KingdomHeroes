export interface UiAction {
    show: UI,
    params?: UiActionParam
}

export enum UI {
    BOTTOM_DIALOG,
    LOGIN,
    MINT_HEROES,
    MINT_KEYS,
    INVENTORY,
    HEROES
}

export interface UiActionParam {}

export interface BottomDialogActionParams extends UiActionParam {
    title: string,
    messages: string[]
}
