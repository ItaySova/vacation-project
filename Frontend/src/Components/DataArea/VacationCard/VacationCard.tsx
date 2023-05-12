import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import "./VacationCard.css";
import { useState } from "react";

interface VacationCardProps {
    vacation: VacationModel
}


function VacationCard(props: VacationCardProps): JSX.Element {
    const startDate = new Date(props.vacation.startDate) // add to checks
    const endtDate = new Date(props.vacation.endDate)
    async function handleFollow() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            if (props.vacation.isFollowing === 0) {
                await dataService.addFollow(props.vacation.vacationId);
            } else {
                await dataService.unFollow(props.vacation.vacationId)
            }
            window.location.reload()
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    // if the vacation is followed return true
    function checkFollow() {
        if (props.vacation.isFollowing === 1) {
            return true;
        }
        return false;
    }
    function checkActive() {
        const currentDate = new Date().getTime()
        if (startDate.getTime() <= currentDate && currentDate >= endtDate.getTime()) {
            return true;
        }
        alert('returning false')
        return false;
    }

    function checkNotStart() {
        const currentDate = new Date()
        const startDate = new Date(props.vacation.startDate).getTime()
        // alert(startDate > currentDate.getTime())
        // alert(`${startDate} < ${currentDate.getTime()}`)
        if (startDate > currentDate.getTime()) {
            return true;
        }
        return false;
    }

    // function allConditionCheck(){
    //     // alert('before showFollowed')
    //     if (props.showFollowed === true){
    //         const followDisplay = checkFollow();
    //         // if the the followed vacations toggle is on and the vacation is not followed by the user return empty div
    //         if (!followDisplay){
    //             return (<></>)
    //         }
    //     // alert('before showFuture')
    //     }
    //     if (props.showFuture === true){
    //         const futureDisplay = checkNotStart();
    //         if (!futureDisplay){
    //             return (<></>);
    //         }
    //     }
    //     if (props.showActive === true){
    //         const activeDisplay = checkActive();
    //         if (!activeDisplay){
    //             return (<></>);
    //         }
    //     }
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
                dates: {startDate.toDateString()} - {endtDate.toDateString()}
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