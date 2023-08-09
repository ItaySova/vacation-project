import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import "./UsersTable.css";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";

function UsersTable(): JSX.Element {
    const navigate = useNavigate();

    const [users, setUsers] = useState<UserModel[]>([])
    
    useEffect(() => {
        const user = authStore.getState().user;
        if (!user) {
            navigate("/login");
            return;
        }
        //

    }, [])

    return (
        <div className="UsersTable">
			will be users page
        </div>
    );
}

export default UsersTable;
