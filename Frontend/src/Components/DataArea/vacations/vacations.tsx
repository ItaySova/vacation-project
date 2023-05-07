import { useEffect, useState } from "react";
import "./vacations.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";

function Vacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    
    // Get all products once:
    useEffect(() => {
        dataService.getAllVacations()
            .then(responseVacations => {
                console.log(responseVacations)
                setVacations(responseVacations)})
            .catch(err => notifyService.error(err));
    }, []);

    // checkbox A is the checkbox for showing only followed vacations
    // checkbox B is the checkbox for showing only vacations that didn't start yet
    // checkbox C is the checkbox for showing only active vacations
    async function handleCheckboxA(){}
    async function handleCheckboxB(){}
    async function handleCheckboxC(){}
    return (
        <div className="vacations">
			<h1>vacation list</h1>
            <br />
            <div id="checkBoxSection">
            <label>show only followed vacations:</label>
            <input type="checkbox" name="checkboxA" id="checkboxA" />
            <hr />
            <label>show only vacations that didn't start yet:</label>
            <input type="checkbox" name="checkboxB" id="checkboxB" />
            <hr />
            <label>show only active vacations:</label>
            <input type="checkbox" name="checkboxC" id="checkboxC" />
            </div>
            <br />
            {vacations.map(p => <VacationCard key={p.vacationId} vacation={p} />)}
        </div>
    );
}

export default Vacations;
