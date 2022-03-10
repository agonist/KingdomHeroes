export interface UiAction {
    show: UI,
    params?: UiActionParam
}

export enum UI {
    BOTTOM_DIALOG,
    LOGIN,
    MINT_HEROES,
    MINT_KEYS
}

export interface UiActionParam {}

export interface BottomDialogActionParams extends UiActionParam {
    messages: string[]
}
