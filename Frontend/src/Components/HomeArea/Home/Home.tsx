import { useEffect } from "react";
import { authStore } from "../../../Redux/AuthState";
import "./Home.css";
import RoleModel from "../../../Models/RoleModel";
import { useNavigate } from "react-router-dom";

function Home(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        const user = authStore.getState().user;
        if (!user) {
            navigate("/login");
            return;
        }
        if (user.roleId === RoleModel.User){
            navigate("/vacations")
        }
        if (user.roleId === RoleModel.Admin){
            navigate("/list")
        }

    }, [])

    return (
        <div className="Home">
			<h2>Home Page -routing to the vacations</h2>
        </div>
    );
}

export default Home;
