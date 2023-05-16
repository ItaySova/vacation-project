import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import "./VacationCard.css";
import { useState } from "react";

interface VacationCardProps {
    vacation: VacationModel
}


function VacationCard(props: VacationCardProps): JSX.Element {
    const [like, setLike] = useState<number>(props.vacation.isFollowing);
    const startDate = new Date(props.vacation.startDate) // add to checks
    const endDate = new Date(props.vacation.endDate)
    async function handleFollow() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            if (props.vacation.isFollowing === 0) {
                await dataService.addFollow(props.vacation.vacationId);
                props.vacation.isFollowing = 1;
                setLike(1);
            } else {
                await dataService.unFollow(props.vacation.vacationId)
                props.vacation.isFollowing = 0;
                setLike(0);
            }
            // window.location.reload()
        }
        catch (err: any) {
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
                dates: {startDate.toDateString()} - {endDate.toDateString()}
                <br />
                picture name: {props.vacation.pictureName}
                <br />
                followers: {props.vacation.followersCount}
                <br />
                follows: {props.vacation.isFollowing}
                <br />
                <button onClick={handleFollow}> {like === 0 ? "Like ❤": "unfollow" }</button>
            </div>
        </div>)


}
//<NavLink to="#" onClick={deleteMe}>Delete</NavLink>
export default VacationCard;

            // <div className="VacationCard Box">
            //     <div>
            //     vacations id: {props.vacation.vacationId}
            //     <br />
            //     dest: {props.vacation.destination}
            //     <br />
            //     Price: {props.vacation.price}
            //     <br />
            //     description: {props.vacation.description}
            //     <br />
            //     picture name: {props.vacation.pictureName}
            //     <br />
            //     followers: {props.vacation.followersCount}
            //     <br />
            //     follows: {props.vacation.isFollowing}
            //     <br />
            //     <button onClick={handleFollow}>follow button</button>
            //     </div>
            // </div>