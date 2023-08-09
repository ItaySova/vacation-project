import { useNavigate, useParams } from "react-router-dom";
import "./EditUser.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";


function EditUser(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<UserModel>();
    const navigate = useNavigate();

    return (
        <div className="EditUser">
			edit user form
        </div>
    );
}

export default EditUser;
