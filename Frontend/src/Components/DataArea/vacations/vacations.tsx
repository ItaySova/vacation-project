import { useEffect, useState } from "react";
import "./vacations.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";

function Vacations(): JSX.Element {
    const navigate = useNavigate(); // check later

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

    // Get all products once:
    useEffect(() => {
        dataService.getAllVacations({ page: pageState, showFollowed , showFuture,showActive}) // ADD HERE
            .then(response => {
                console.log(response.vacations)
                setVacations(response.vacations)
                setPagesState(response.numOfPages)
            })
            .catch(err => {
                alert(notifyService.error(err))
                });
    }, [pageState, showFollowed, showFuture,showActive]); // ADD EHERE


    async function statedTest() {
        alert(`show followed vacations = ${showFollowed}\nshow not started = ${showFuture}\nshow active = ${showActive}`)
    }

    function handleShowFollowed(){
        if(!showFollowed){
            setFuture(false);
            setActive(false);
        }
        setSF(!showFollowed);
    }
    function handleFuture(){
        if(!showFuture){
            setSF(false);
            setActive(false);
        }
        setFuture(!showFuture);
    }

    function handleShowActive(){
        if(!showActive){
            setSF(false);
            setFuture(false);
        }
        setActive(!showActive);
    }
    return (
        <div className="vacations">
            <h1>vacation list</h1>
            <br />
            <button onClick={statedTest}>states check</button>
            <hr />
            <div id="checkBoxSection">
                <button onClick={handleShowFollowed}>show only followed vacations</button>
                <br />
                <button onClick={handleFuture}>show only vacations that didn't start yet</button>
                <br />
                <button onClick={handleShowActive}>show only active vacations</button>
                <br />
                <label>show only followed vacations:</label>
                <input type="checkbox" name="checkboxSF" id="checkboxSF" onChange={() => { setSF(!showFollowed) }} />
                <hr />
                <label>show only vacations that didn't start yet:</label>
                <input type="checkbox" name="checkboxNS" id="checkboxNS" onChange={() => { setFuture(!showFuture) }} />
                <hr />
                <label>show only active vacations:</label>
                <input type="checkbox" name="checkboxA" id="checkboxA" onChange={() => { setActive(!showActive) }} />
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
