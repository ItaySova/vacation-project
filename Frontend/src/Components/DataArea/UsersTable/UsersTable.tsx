import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import "./UsersTable.css";
import { NavLink, useNavigate } from "react-router-dom";
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
            <table>
                <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>edit</th>
                    <th>remove</th>
                </tr>
                {users.map(user => 
                    <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td><button>
                            <NavLink to={"/users/edit/" + user.userId}>Edit</NavLink>
                        </button>
                        </td>
                    <td>remove</td>
                    </tr>
                )}
                
            </table>
        </div>
    );
}

export default UsersTable;
