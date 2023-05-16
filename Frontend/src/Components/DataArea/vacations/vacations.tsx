import { useEffect, useState } from "react";
import "./vacations.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import { vacationsStore } from "../../../Redux/VacationsState";

function Vacations(): JSX.Element {
    const navigate = useNavigate();

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [showFollowed, setSF] = useState<boolean>(false);
    const [showFuture, setFuture] = useState<boolean>(false);
    const [showActive, setActive] = useState<boolean>(false);
    const [pageState, setPageState] = useState<number>(1);
    const [pagesState, setPagesState] = useState<number>(1);

    useEffect(() => {
        const user = authStore.getState().user;

        if (!user) {
            navigate("/login");
        }

    }, [])

    // Get all vacations every time a filter is chosen once:
    useEffect(() => {
        dataService.getAllVacations({ page: pageState, showFollowed, showFuture, showActive })
            .then(response => {
                setVacations(response.vacations)
                setPagesState(response.numOfPages)
            })
            .catch(err => {
                if (err.response.data === 'Invalid token') {
                    authService.logout();
                    navigate("/login");
                } // check if need to remove 
                return notifyService.error(err)
            });

        const unsubscribe = vacationsStore.subscribe(() => {
            const duplicatedVacations = [...vacationsStore.getState().vacations];
            setVacations(duplicatedVacations);
        });
    }, [pageState, showFollowed, showFuture, showActive]);


    function handleShowFollowed() {
        if (!showFollowed) {
            setFuture(false);
            setActive(false);
        }
        setSF(!showFollowed);
    }
    function handleFuture() {
        if (!showFuture) {
            setSF(false);
            setActive(false);
        }
        setFuture(!showFuture);
    }

    function handleShowActive() {
        if (!showActive) {
            setSF(false);
            setFuture(false);
        }
        setActive(!showActive);
    }
    return (
        <div className="vacations">
            <h1>vacation list</h1>
            <hr />
            <div id="checkBoxSection">
                <button onClick={handleShowFollowed}>show only followed vacations</button>
                <button onClick={handleFuture}>show only vacations that didn't start yet</button>
                <button onClick={handleShowActive}>show only active vacations</button>
                <br />
            </div>
            <br />
            <div>
                {vacations.map(p => <VacationCard key={p.vacationId} vacation={p} />)}
            </div>
            {Array.from(Array(pagesState)).map((_, index: number) => {
                return <button type="button" className="vacationsPage" onClick={() => setPageState(index + 1)}>{index + 1}</button>;
            })}


        </div>
    );
}

export default Vacations;
