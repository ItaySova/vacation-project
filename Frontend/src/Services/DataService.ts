import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";
import FollowerModel from "../Models/FollowerModel";

class DataService {
    public async getAllVacations(): Promise<VacationModel[]> {

        // Take products from global state:
        let vacations = vacationsStore.getState().vacations;

        // If we don't have products - get them from backend:
        if (vacations.length === 0) {

            // Get from REST API products: 
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            // Extract products: 
            vacations = response.data; // data will be ProductModel[]

            // Update global store: 
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        // Return:
        console.log(vacations)
        return vacations;
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

        // Return:
        return vacation;
    }

    public async addFollow(vacationId: number): Promise<void>{

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send product to server:
        const response = await axios.post<FollowerModel>(appConfig.followerUrl + vacationId, { headers });
        console.log(response)
        // Get the added product:
        // const addedProduct = response.data;

        // Add that addedProduct also to the global state: 
        // vacationsStore.dispatch({ type: ProductsActionType.AddProduct, payload: addedProduct });
    }

    public async unFollow(vacationId: number): Promise<void>{

        // Create header for sending image inside the body:
        const headers = { "Content-Type": "multipart/form-data" };

        // Send product to server:
        const response = await axios.delete<FollowerModel>(appConfig.followerUrl + vacationId, { headers });
        console.log(response)
        // Get the added product:
        // const addedProduct = response.data;

        // Add that addedProduct also to the global state: 
        // vacationsStore.dispatch({ type: ProductsActionType.AddProduct, payload: addedProduct });
    }
}

const dataService = new DataService();

export default dataService;
