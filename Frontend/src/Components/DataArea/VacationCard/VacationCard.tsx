import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import "./VacationCard.css";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
        <div className="VacationCard">
            <Card style={{ width: '18rem' }}>
                <Card.Img className="card_image" variant="top" crossOrigin="anonymous" src={`${props.vacation.pictureName}`} />
                <Card.Body>
                    <Card.Title>{props.vacation.destination}</Card.Title>
                    <Card.Text className="card_body">{props.vacation.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ height: '4rem' }}>{startDate.toDateString()} - {endDate.toDateString()}</ListGroup.Item>
                    <ListGroup.Item>Price: {props.vacation.price}</ListGroup.Item>
                    <ListGroup.Item>followers: {props.vacation.followersCount}</ListGroup.Item>
                    <ListGroup.Item><button id={`likeButton${props.vacation.vacationId}`} onClick={handleFollow}> {props.vacation.isFollowing === 0 ? "Like ❤": "unfollow" }</button></ListGroup.Item>
                </ListGroup>
            </Card>
        </div>)


}

export default VacationCard;
