import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import "./UsersTable.css";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import userService from "../../../Services/UsersService";
import notifyService from "../../../Services/NotifyService";

function UsersTable(): JSX.Element {
    const navigate = useNavigate();

    const [users, setUsers] = useState<UserModel[]>([])
    
    useEffect(() => {
        const user = authStore.getState().user;
        if (!user) {
            navigate("/login");
            return;
        }
        userService.getAllUsers()
        .then(res => setUsers(res))
        .catch(err => notifyService.error(err))

    }, [])

    return (
        <div className="UsersTable">
			<h1>will be users page</h1>
        </div>
    );
}

export default UsersTable;
