import { useState, useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./VacationsReport.css";

function VacationsReport(): JSX.Element {
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
        <div className="VacationsReport">
            <p>vacations report</p>
            <table>
                <thead>
                    <tr>
                        <th>destentation</th>
                        <th>followers</th>
                    </tr>
                </thead>
                <tbody>
                    {vacations.map(vacations => <tr key={vacations.vacationId}>
                        <td>{vacations.destination}</td>
                        <td>{vacations.followersCount}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default VacationsReport;
