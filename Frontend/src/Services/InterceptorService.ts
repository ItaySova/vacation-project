import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {

    // Create interceptor:
    public create(): void {

        // Register to any request: 
        axios.interceptors.request.use(requestObject => {

            // If we have a token: 
            if(authStore.getState().token) {

                // Add authorization header, containing the token:
                requestObject.headers.setAuthorization("Bearer " + authStore.getState().token)
            }

            // Return the updated request object:
            return requestObject;
        });
    }
}

const interceptorService = new InterceptorService();

export default interceptorService;
