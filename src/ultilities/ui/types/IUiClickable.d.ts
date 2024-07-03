interface IUiClickable {

    isClicked: boolean;
    enterActiveState(): void;
    enterUnactiveState(): void;
}

export default IUiClickable;