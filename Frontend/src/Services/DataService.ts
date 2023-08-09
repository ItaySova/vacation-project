import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";
import FollowerModel from "../Models/FollowerModel";

class DataService {
    public async getAllVacations(data?: { page?: number, showFollowed?: boolean, showFuture?:boolean, showActive?:boolean }): Promise<{ vacations: VacationModel[], numOfPages: number }> {

        // Take products from global state:
        let vacations: VacationModel[] = vacationsStore.getState().vacations;
        let numOfPages = 1;

        // If we don't have products - get them from backend:
        // if (vacations.length === 0) {

        let url = appConfig.vacationsUrl;

        const queryParams = new URLSearchParams();

        if (data?.page) {
            queryParams.append('page', String(data.page));
        }

        if (data?.showFollowed) {
            queryParams.append('showFollowed', String(data.showFollowed));
        }

        if (data?.showFuture) {
            queryParams.append('showFuture', String(data.showFuture));
        }

        if (data?.showActive) {
            queryParams.append('showActive', String(data.showActive));
        }

        url += `?${queryParams.toString()}`;

        // Get from REST API products: 
        const response = await axios.get<{ vacations: VacationModel[], numOfPages: number }>(url);

        // Extract products: 
        vacations = response.data.vacations; //
        numOfPages = response.data.numOfPages;

        // Update global store: 
        vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });


        // Return:
        // console.log(vacations)
        return {
            vacations, // vacations: vactions - the same ike
            numOfPages: Number(numOfPages),
        };
    }


    public async getOneVacation(id: number): Promise<VacationModel> {

        // Take products from global state:
        let vacations = vacationsStore.getState().vacations;

        // Find the needed product: 
        let vacation = vacations.find(p => p.vacationId === id);

        // If product doesn't exist - get it from backend:
        if (!vacation) {

            // Get product from REST API:
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);

            // Extract product:
            vacation = response.data;

            // No need to update global state
        }

        // vacation.pictureName = appConfig.imagesUrl + vacation.pictureName;
        // Return:
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void>{
        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation to server:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation,  { headers });
        // Get the updated product:
        const addedVacation = response.data;

        // Update global store with the updatedProduct: 
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation , payload: addedVacation });
    }


    public async editVacation(vacation: VacationModel): Promise<void>{
        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation to server:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, { headers });
        // Get the updated product:
        const updatedVacation = response.data;

        // Update global store with the updatedProduct: 
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }


    public async deleteVacation(id: number): Promise<void> {

        // Delete product on server:
        await axios.delete(appConfig.vacationsUrl + id);

        // Delete that product form our global store: 
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: id });
    }

    // todo - continue
    public async addFollow(vacationId: number): Promise<void> {

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send product to server:
        const response = await axios.post<FollowerModel>(appConfig.followerUrl + vacationId, { headers });

        // Add the follow to the global state
        vacationsStore.dispatch({ type: VacationsActionType.addFollow, payload: response.data });
    }

    public async unFollow(vacationId: number): Promise<void> {


        // Send product to server:
        await axios.delete<FollowerModel>(appConfig.followerUrl + vacationId);

        // remove the follow from the global state
        vacationsStore.dispatch({ type: VacationsActionType.removeFollow, payload: vacationId });
    }

}

const dataService = new DataService();

export default dataService;
