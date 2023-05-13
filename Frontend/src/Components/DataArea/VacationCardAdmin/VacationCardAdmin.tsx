import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCardAdmin.css";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { useEffect } from "react";

interface VacationCardProps {
    vacation: VacationModel
}


function VacationCardAdmin(props: VacationCardProps): JSX.Element {
    const startDate = new Date(props.vacation.startDate) // add to checks
    const endtDate = new Date(props.vacation.endDate)
    // Get object containing all route params:

    // Navigate hook:
    const navigate = useNavigate();
        
    async function deleteMe() {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await dataService.deleteVacation(props.vacation.vacationId);
            notifyService.success("Product has been deleted");
            navigate("/list");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationCardAdmin">
			    <div>
                vacations id: {props.vacation.vacationId}
                <br />
                dest: {props.vacation.destination}
                <br />
                Price: {props.vacation.price}
                <br />
                description: {props.vacation.description}
                <br />
                dates: {startDate.toDateString()} - {endtDate.toDateString()}
                <br />
                picture name: {props.vacation.pictureName}
                <br />
                followers: {props.vacation.followersCount}
                <br />
                follows: {props.vacation.isFollowing}
                <br />
                <button>
                    <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>Edit</NavLink>
                </button>
                <span> | </span>
                <button>
                    <NavLink to="#" onClick={deleteMe}>Delete</NavLink>
                </button>
            </div>
        </div>
    );
}
// "/vacations/edit/:vacationId"
export default VacationCardAdmin;
