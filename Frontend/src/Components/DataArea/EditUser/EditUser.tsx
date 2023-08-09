import { useNavigate, useParams } from "react-router-dom";
import "./EditUser.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import userService from "../../../Services/UsersService";
import notifyService from "../../../Services/NotifyService";


function EditUser(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<UserModel>();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>()

    useEffect(()=>{
        const id = +params.userId;
        userService.getOneUser(id)
        .then(res => {
            setUser(res);
            setValue("userId", res.userId);
            setValue("firstName", res.firstName);
            setValue("lastName", res.lastName);
            setValue("email", res.email);
            setValue("roleId", res.roleId);
            setValue("password", res.password);
        })
        .catch(err => notifyService.error(err))
    },[])
    return (
        <div className="EditUser">
			edit user form
        </div>
    );
}

export default EditUser;
