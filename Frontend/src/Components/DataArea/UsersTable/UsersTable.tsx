import { useEffect } from "react";
import { authStore } from "../../../Redux/AuthState";
import "./UsersTable.css";
import { useNavigate } from "react-router-dom";

function UsersTable(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        const user = authStore.getState().user;
        if (!user) {
            navigate("/login");
            return;
        }

    }, [])

    return (
        <div className="UsersTable">
			will be users page
        </div>
    );
}

export default UsersTable;
