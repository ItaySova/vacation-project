import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";
import { authStore } from "./AuthState";

// 1. Products State - The application level state regarding products: 
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Products Action Type - Which actions we can perform on our products global state
export enum VacationsActionType {
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    addFollow,
    removeFollow
}

// 3. Products Action - Interface describing an object for performing one action on our products global state:
export interface VacationsAction {
    type: VacationsActionType; // Which operation we're going to perform.
    payload: any; // What is the data related to that operation.
}

// 4. Products Reducer - The main function performing the needed action.
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate current state into a new state:
    const newState = { ...currentState };

    // Perform the needed action on the newState:
    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here, the payload is all products for saving
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here, the payload is a product object for adding
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here, the payload is a product object for updating
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: // Here, the payload is the product id for deleting
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

        // follow redux state
        case VacationsActionType.addFollow:
            const indexToAddFollow = newState.vacations.findIndex(p => p.vacationId === action.payload[1])
            // update the follow state
            newState.vacations[indexToAddFollow].isFollowing = 1;
            newState.vacations[indexToAddFollow].followersCount += 1;
            break;

        case VacationsActionType.removeFollow:
            const indexToRemoveFollow = newState.vacations.findIndex(p => p.vacationId === action.payload)
            // update the follow state
            newState.vacations[indexToRemoveFollow].isFollowing = 0;
            newState.vacations[indexToRemoveFollow].followersCount -= 1;
            break;
    }

    // Return the newState: 
    return newState;
}

// 5. Products Store - The manager object handling redux:
export const vacationsStore = createStore(vacationsReducer);
