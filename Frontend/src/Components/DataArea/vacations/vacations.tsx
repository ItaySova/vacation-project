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
    
    return (
        <div className="vacations">
			<h1>vacation list</h1>
            {vacations.map(p => <VacationCard key={p.vacationId} vacation={p} />)}
        </div>
    );
}

export default Vacations;
