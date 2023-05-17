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

    const endDate = new Date(props.vacation.endDate)

    async function handleFollow() {
        try {
            if (props.vacation.isFollowing === 0) {
                await dataService.addFollow(props.vacation.vacationId);
            } else {
                await dataService.unFollow(props.vacation.vacationId)
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }


    return (
        <div className="VacationCard Box">
            <div>
                <img src={props.vacation.pictureName} />
                <br />
                dates: {startDate.toDateString()} - {endDate.toDateString()}
                <br />
                dest: {props.vacation.destination}
                <br />
                description: {props.vacation.description}
                <br />
                followers: {props.vacation.followersCount}
                <br />
                follows: {props.vacation.isFollowing}
                <br />
                <button id={`likeButton${props.vacation.vacationId}`} onClick={handleFollow}> {props.vacation.isFollowing === 0 ? "Like ❤": "unfollow" }</button>
                <br />
                <div className="priceTag">
                    Price: {props.vacation.price}
                </div>
            </div>
        </div>)


}

export default VacationCard;
