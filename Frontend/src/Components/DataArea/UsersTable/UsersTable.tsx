import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import "./UsersTable.css";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import userService from "../../../Services/UsersService";
import notifyService from "../../../Services/NotifyService";
import RoleModel from "../../../Models/RoleModel";

function UsersTable(): JSX.Element {
    const navigate = useNavigate();

    const [users, setUsers] = useState<UserModel[]>([])

    useEffect(() => {
        const user = authStore.getState().user;
        if (!user) {
            navigate("/login");
            return;
        }
        if (user.roleId == RoleModel.User) {
            navigate("/home")
            return;
        }
        
        userService.getAllUsers()
            .then(res => setUsers(res))
            .catch(err => notifyService.error(err))

    }, [])

    async function deleteMe(userId: number) {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await userService.deleteUser(userId);
            notifyService.success("user has been deleted");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="UsersTable">
            <h1>Users table</h1>
            <table>
                <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>role</th>
                    <th>edit</th>
                    <th>remove</th>
                </tr>
                {users.map(user => 
                    <tr key={user.userId}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.roleId === RoleModel.Admin ? "Admin": "User"}</td>
                    <td><button>
                            <NavLink to={"/users/edit/" + user.userId}>Edit</NavLink>
                        </button>
                        </td>
                    <td><button>
                            <NavLink to="#" onClick={()=> {deleteMe(user.userId)}}>Delete</NavLink>
                        </button></td>
                    </tr>
                )}
                
            </table>
        </div>
    );
}

export default UsersTable;
