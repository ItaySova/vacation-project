import { useNavigate } from "react-router-dom";
import "./List.css";
import { useState, useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationCardAdmin from "../VacationCardAdmin/VacationCardAdmin";
import { vacationsStore } from "../../../Redux/VacationsState";

function List(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [count, setCount] = useState<number>(0);
    const [pageState, setPageState] = useState<number>(1);
    const [pagesState, setPagesState] = useState<number>(1);
    const navigate = useNavigate();
    useEffect(() => {
        const user = authStore.getState().user;
        const token = authStore.getState().token

        if (!user) {
            navigate("/login");
            // return;
        }

        // Take number of products length into count: 
        setCount(vacationsStore.getState().vacations.length);

        // Subscribe for changes (any dispatch will invoke the callback): 
        const unsubscribe = vacationsStore.subscribe(() => {

            // Take number of products length into count: 
            setCount(vacationsStore.getState().vacations.length);
        });

        // Stop listening when component destroyed:
        return () => unsubscribe();
    }, [])

    // Get all products once:
    useEffect(() => {
        dataService.getAllVacations({ page: pageState })
            .then(response => {
                setVacations(response.vacations)
                setPagesState(response.numOfPages)
            })
            .catch(err => {
                if (err.response.data === 'Invalid token'){
                    authService.logout();
                    navigate("/login");
                }
                return notifyService.error(err)
            });
    }, [pageState, count]);
    return (
        <div className="List">
            <h2>vacations Page</h2>
            <hr />
            <div>
                {vacations.map(p => <VacationCardAdmin key={p.vacationId} vacation={p} />)}
            </div>
            {Array.from(Array(pagesState)).map((_, index: number) => {
                return <button type="button" key={index + 1} className="vacationsPage" onClick={() => setPageState(index + 1)}>{index + 1}</button>;
            })}
        </div>
    );
}

export default List;
