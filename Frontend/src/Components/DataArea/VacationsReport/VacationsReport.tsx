import { useState, useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./VacationsReport.css";
import ReportChart from "../ReportChart/ReportChart";
import { CSVLink } from "react-csv";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";

function VacationsReport(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate();
    // Get all products once:
    useEffect(() => {
        const user = authStore.getState().user;
        if (!user) {
            navigate("/login");
        }
        dataService.getAllVacations()
        .then(response => {
            console.log(response.vacations)
            setVacations(response.vacations)
        })
        .catch(err => {
            if (err.response.data === 'Invalid token'){
                authService.logout();
                navigate("/login");
            }
            return notifyService.error(err)});
    }, []);

    const headers = [
        { label: "Destination", key: "Destination" },
        { label: "Followers", key: "Followers" }
      ];
    const data:any[] = []
    vacations.map(v => {
        data.push({
            Destination: v.destination,
            Followers: v.followersCount
        })
    })

    const csvReport = {
        data: data,
        headers: headers,
        filename: 'Report.csv'
      };

    return (
        <div className="VacationsReport">
            <p>vacations report</p>
            <br />
            <ReportChart key={"chart"} vacations={vacations} />
            <br />
            <button><CSVLink {...csvReport}>Export to CSV</CSVLink></button>
            
        </div>
    );
}

export default VacationsReport;