import { useEffect, useState } from "react";
import "./vacations.css";
import dataService from "../../../Services/DataService";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { Navigate, Route, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";

function Vacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [showFollowed, setSF] = useState<Boolean>();
    const [showNotStart, setNotStart] = useState<Boolean>();
    const [showActive, setActive] = useState<Boolean>();

    const navigate = useNavigate(); // check later

    useEffect(() => {
        const user = authStore.getState().user
        if (!user){
            navigate("/login")
        }
    },[])

    useEffect(()=>{
        setSF(false);
        setActive(false);
        setNotStart(false)
    },[])
   
    // Get all products once:
    useEffect(() => {
        dataService.getAllVacations()
            .then(responseVacations => {
                console.log(responseVacations)
                setVacations(responseVacations)})
            .catch(err => notifyService.error(err));
    }, []);


    async function statedTest(){
        alert(`show followed vacations = ${showFollowed}\nshow not started = ${showNotStart}\nshow active = ${showActive}`)
    }
    return (
        <>
        <div className="vacations">
			<h1>vacation list</h1>
            <br />
            <button onClick={statedTest}>states check</button>
            <hr />
            <div id="checkBoxSection">
            <label>show only followed vacations:</label>
            <input type="checkbox" name="checkboxSF" id="checkboxSF" onChange={()=> {setSF(!showFollowed)}} />
            <hr />
            <label>show only vacations that didn't start yet:</label>
            <input type="checkbox" name="checkboxNS" id="checkboxNS" onChange={()=> {setNotStart(!showNotStart)}}/>
            <hr />
            <label>show only active vacations:</label>
            <input type="checkbox" name="checkboxA" id="checkboxA" onChange={()=> {setActive(!showActive)}}/>
            </div>
            <br />
            {vacations.map(p => <VacationCard key={p.vacationId} vacation={p} showActive={showActive} showFollowed={showFollowed} showdidntStart={showNotStart}/>)}
        </div>
        </>
    );
}

export default Vacations;
