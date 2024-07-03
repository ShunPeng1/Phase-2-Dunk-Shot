import IState from "../../ultilities/state_machines/IState";
import IStateMementoStrategy from "../../ultilities/state_machines/IStateMementoStrategy";
import IStateTransitionData from "../../ultilities/state_machines/IStateTransitionData";
import CustomizeState from "./CustomizeState";

class DunkShotStateMementoStrategy implements IStateMementoStrategy{
    
    private mementoStack: Array<[IState, IStateTransitionData | null]> = [];

    save(transitionState: IState, transitionData: IStateTransitionData | null): void {
        if (transitionState instanceof CustomizeState) {
            return;
        }

        this.mementoStack.push([transitionState, transitionData]);
    }

    restore(isRemoveRestore: boolean = true): [IState | null, IStateTransitionData | null] {
        if (this.mementoStack.length === 0) {
            return [null, null];
        }
        return isRemoveRestore ? this.mementoStack.pop()! : this.mementoStack[this.mementoStack.length - 1];
    }

}

export default DunkShotStateMementoStrategy;