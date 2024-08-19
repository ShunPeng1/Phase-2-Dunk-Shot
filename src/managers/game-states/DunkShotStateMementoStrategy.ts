import IState from "../../utilities/state-machines/IState"
import IStateMementoStrategy from "../../utilities/state-machines/IStateMementoStrategy"
import IStateTransitionData from "../../utilities/state-machines/IStateTransitionData"
import CustomizeState from "./CustomizeState"

class DunkShotStateMementoStrategy implements IStateMementoStrategy{
    
    private mementoStack: Array<[IState, IStateTransitionData | null]> = []

    save(transitionState: IState, transitionData: IStateTransitionData | null): void {
        if (transitionState instanceof CustomizeState) {
            return
        }

        this.mementoStack.push([transitionState, transitionData])
    }

    restore(isRemoveRestore = true): [IState | null, IStateTransitionData | null] {
        if (this.mementoStack.length === 0) {
            return [null, null]
        }
        if (isRemoveRestore) {
            const poppedItem = this.mementoStack.pop()
            return poppedItem ? poppedItem : [null, null]
        } else {
            return this.mementoStack[this.mementoStack.length - 1]
        }
    }

}

export default DunkShotStateMementoStrategy