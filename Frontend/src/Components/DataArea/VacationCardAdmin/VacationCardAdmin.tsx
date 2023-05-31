import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCardAdmin.css";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface VacationCardProps {
    vacation: VacationModel
}


function VacationCardAdmin(props: VacationCardProps): JSX.Element {
    const startDate = new Date(props.vacation.startDate)
    const endtDate = new Date(props.vacation.endDate)
    // Get object containing all route params:

    // Navigate hook:
    const navigate = useNavigate();

    async function deleteMe() {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await dataService.deleteVacation(props.vacation.vacationId);
            notifyService.success("vacation has been deleted");
            navigate("/list");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationCardAdmin">
            <Card style={{ width: '18rem' }}>
                <Card.Img className="card_image" variant="top" src={`${props.vacation.pictureName}`} />
                <Card.Body>
                    <Card.Title>{props.vacation.destination}</Card.Title>
                    <Card.Text className="card_body">{props.vacation.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ height: '4rem' }}>{startDate.toDateString()} - {endtDate.toDateString()}</ListGroup.Item>
                    <ListGroup.Item>Price: {props.vacation.price}</ListGroup.Item>
                    <ListGroup.Item>
                        <button>
                            <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>Edit</NavLink>
                        </button>
                        <span>|</span>
                        <button>
                            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>
                        </button>
                        </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default VacationCardAdmin;