import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}


function VacationCard(props: VacationCardProps): JSX.Element {
    
    async function handleFollow() {
        try {
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            if (props.vacation.isFollowing === 0){
                await dataService.addFollow(props.vacation.vacationId);
            } else {
                await dataService.unFollow(props.vacation.vacationId)
            }
            window.location.reload()
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="VacationCard Box">
            <div>
                vacations id: {props.vacation.vacationId}
                <br />
                dest: {props.vacation.destination}
                <br />
                Price: {props.vacation.price}
                <br />
                description: {props.vacation.description}
                <br />
                picture name: {props.vacation.pictureName}
                <br />
                followers: {props.vacation.followersCount}
                <br />
                follows: {props.vacation.isFollowing}
                <br />
                <button onClick={handleFollow}>follow button</button>
            </div>
        </div>
    );
}
//<NavLink to="#" onClick={deleteMe}>Delete</NavLink>
export default VacationCard;
