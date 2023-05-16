import { useNavigate } from "react-router-dom";
import "./List.css";
import { useState, useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";

function List(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [pageState, setPageState] = useState<number>(1);
    const [pagesState, setPagesState] = useState<number>(1);
    const navigate = useNavigate(); 
    useEffect(() => {
        const user = authStore.getState().user;
        const token = authStore.getState().token

        if (!user || !token) {
            navigate("/login");
        }
    }, [])

    // Get all products once:
    useEffect(() => {
        dataService.getAllVacations({ page: pageState}) // ADD HERE
            .then(response => {
                console.log(response.vacations)
                setVacations(response.vacations)
                setPagesState(response.numOfPages)
            })
            .catch(err => {
                // if (err.response.data === 'Invalid token'){
                //     authService.logout();
                //     navigate("/login");
                // }
                return notifyService.error(err)});
    }, [pageState]);
    return (
        <div className="List">
			<h2>vacations Page</h2>
            <hr />
            <div>
                {vacations.map(p => <VacationCardAdmin key={p.vacationId} vacation={p} />)}
            </div>
            {Array.from(Array(pagesState)).map((_, index: number) => {
                return <button type="button" className="vacationsPage" onClick={() => setPageState(index + 1)}>{index + 1}</button>;
            })}
        </div>
    );
}

export default List;
