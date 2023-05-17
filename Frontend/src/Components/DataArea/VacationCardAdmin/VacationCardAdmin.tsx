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
            notifyService.success("vacation has been deleted");
            navigate("/list");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationCardAdmin">
			    <div>
                <img src={props.vacation.pictureName} />
                <br />
                dates: {startDate.toDateString()} - {endtDate.toDateString()}
                <br />
                dest: {props.vacation.destination}
                <br />
                description: {props.vacation.description}
                <br />
                Price: {props.vacation.price}                
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
