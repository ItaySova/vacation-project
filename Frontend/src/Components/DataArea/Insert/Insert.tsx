import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import "./Insert.css";
import dataService from "../../../Services/DataService";
import { useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function Insert(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            // vacation.image = (product.image as unknown as FileList)[0];
            console.log(`vacation from send: ${vacation}`)
            console.log(vacation)
            await dataService.addVacation(vacation);
            notifyService.success("vacation has been added");
            navigate("/list");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Insert">
            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>destination:</label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={100} />
                <hr />

                <label>description:</label>
                <textarea {...register("description")} required minLength={2} maxLength={1000} rows={5}></textarea>
                <hr />

                <label>starts on:</label>
                <input type="date" {...register("startDate")} required />
                <hr />

                <label>end on on:</label>
                <input type="date" {...register("endDate")} required />
                <hr />

                <label>Price:</label>
                <input type="number" {...register("price")} required min={0} max={10000} />
                <hr />

                <label>Image: </label>
                <input type="text" {...register("pictureName")} />


                <button>Update</button>

            </form>
        </div>
    );
}

export default Insert;
