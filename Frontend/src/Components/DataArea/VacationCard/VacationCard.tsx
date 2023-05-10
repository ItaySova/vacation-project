import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import "./VacationCard.css";
import { useState } from "react";

interface VacationCardProps {
    vacation: VacationModel;
    showActive: Boolean;
    showdidntStart: Boolean;
    showFollowed: Boolean;
}


function VacationCard(props: VacationCardProps): JSX.Element {
    const startDate = new Date(props.vacation.startDate)
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

    // if the vacation is followed return true
    function checkFollow() {
        if (props.vacation.isFollowing === 1){
            return true;
        }
        return false;
    }
    function checkActive() {
        if (props.vacation.isFollowing === 1){
            return true;
        }
        return false;
    }

    function checkNotStart() {
        const currentDate = new Date()
        const startDate = new Date(props.vacation.startDate).getTime()
        alert(startDate < currentDate.getTime())
        alert(`${startDate} < ${currentDate.getTime()}`)
        if (startDate > currentDate.getTime()){
            return true;
        }
        return true;
    }

    function allConditionCheck(){
        if (props.showFollowed === true){
            const followDisplay = checkFollow();
            // if the the followed vacations toggle is on and the vacation is not followed by the user return empty div
            if (!followDisplay){
                return (<></>)
            }
            checkNotStart()
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
            start date: {props.vacation.startDate as any}
            <br />
            picture name: {props.vacation.pictureName}
            <br />
            followers: {props.vacation.followersCount}
            <br />
            follows: {props.vacation.isFollowing}
            <br />
            <button onClick={handleFollow}>follow button</button>
            </div>
        </div>)
    }
    
    return (allConditionCheck()
    );
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