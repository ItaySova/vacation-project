import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class AuthService {

    public async register(user: UserModel): Promise<void> {

        // Send user to backend to register:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract token:
        const token = response.data;

        // Save token in global state:
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend to login:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract token:
        const token = response.data;

        // Save token in global state: 
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    public logout(): void {

        // Logout in global state: 
        authStore.dispatch({ type: AuthActionType.Logout });

    }

}

const authService = new AuthService();

export default authService;
