import { createStore } from "redux";
import MassageModel from "../Models/MassageModel";

export class MassageState {
    public massages: MassageModel[] = [];
}

export enum MassagesActionType{
    addMassage
}

export interface MassagesAction {
    type: MassagesActionType; // Which operation we're going to perform.
    payload: MassageModel; // What is the data related to that operation.
}

export function massagesReducer(currentState = new MassageState(), action: MassagesAction): MassageState {

    // Duplicate current state into a new state:
    const newState = { ...currentState };

    // Perform the needed action on the newState:
    switch (action.type) {

        case MassagesActionType.addMassage: // Here, the payload is all products for saving
            newState.massages.push(action.payload);
            break;

    }

    // Return the newState: 
    return newState;
}

export const massagesStore = createStore(massagesReducer);