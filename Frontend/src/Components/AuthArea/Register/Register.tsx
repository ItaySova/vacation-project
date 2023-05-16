import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";
import RoleModel from "../../../Models/RoleModel";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            user.roleId = RoleModel.User;
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/home");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">

            <h2>Register</h2>
			
            <form onSubmit={handleSubmit(send)}>

                <label>First name:</label>
                <input type="text" {...register("firstName")} required/>

                <label>Last name:</label>
                <input type="text" {...register("lastName")} required />

                <label>email:</label>
                <input type="text" {...register("email")} required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />

                <label>Password:</label>
                <input type="password" {...register("password")} required minLength={4}/>

                <button>Register</button>

            </form>
            <p>already a user?</p>
            <NavLink to="/login">Login</NavLink>
        </div>
    );
}

export default Register;
