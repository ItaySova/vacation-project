import { useNavigate, useParams } from "react-router-dom";
import "./EditUser.css";
import UserModel from "../../../Models/UserModel";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import userService from "../../../Services/UsersService";
import notifyService from "../../../Services/NotifyService";
import RoleModel from "../../../Models/RoleModel";


function EditUser(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<UserModel>();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>();

    useEffect(()=>{
        const id = +params.userId;
        userService.getOneUser(id)
        .then(res => {
            setValue("userId", res.userId);
            setValue("firstName", res.firstName);
            setValue("lastName", res.lastName);
            setValue("email", res.email);
            setValue("roleId", res.roleId);
            setValue("password", res.password);
            setUser(res);
        })
        .catch(err => notifyService.error(err));
    }, []);

    async function send(user: UserModel) {
        try {
            await userService.editUser(user);
            notifyService.success("user has been updated");
            navigate("/users");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditUser Box">
			<h2>edit user</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="hidden" {...register("userId")} />
                <hr />
                <label>email:</label>
                <input type="email" {...register("email")} required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
                <hr />
                <label>first name: </label>
                <input type="text" {...register("firstName")} required minLength={2} maxLength={100} />
                <hr />
                <label>last Name: </label>
                <input type="text" {...register("lastName")} required minLength={2} maxLength={100} />
                <hr />
                <label>password: </label>
                <input type="password" {...register("password")} required minLength={2} maxLength={100} />
                <hr />
                <label>role: </label>
                <select defaultValue="" {...register("roleId")} required>
                    <option disabled value="">Select role...</option>
                    <option key={RoleModel.Admin} value={RoleModel.Admin}>Admin</option>
                    <option key={RoleModel.User} value={RoleModel.User}>User</option>
                </select>
                <hr />
                <button>Update</button>
            </form>
        </div>
    );
}

export default EditUser;
