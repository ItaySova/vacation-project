import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

function EditVacation(): JSX.Element {

    const params = useParams();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>();

    // Get product to edit:
    useEffect(() => {
        const id = +params.vacationId;
        dataService.getOneVacation(id)
            .then(responseVacation => {
                setValue("vacationId", responseVacation.vacationId);
                setValue("destination", responseVacation.destination);
                setValue("description", responseVacation.description);
                setValue("startDate", responseVacation.startDate);
                setValue("endDate", responseVacation.endDate);
                setValue("price", responseVacation.price);
                setValue("pictureName", responseVacation.pictureName);
                setVacation(responseVacation);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            // vacation.image = (product.image as unknown as FileList)[0];
            // console.log(`vacation from send: ${vacation}`)
            // console.log(vacation)
            if (vacation.endDate < vacation.startDate) {
                alert("start date must be earlier then end date")
                return;
            }
            await dataService.editVacation(vacation);
            notifyService.success("vacation has been updated");
            navigate("/list");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation">
            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId")} />

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

export default EditVacation;

// for later when pictures will be implemented
// {/* <label>Image: </label>
// <input type="file" accept="image/*" {...register("image")} /> */}

// {/* <img src={product?.imageUrl} /> */}