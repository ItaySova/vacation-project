import "./ReportChart.css";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import VacationModel from "../../../Models/VacationModel";

interface chartProps {
    vacations: VacationModel[]
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function ReportChart(props: chartProps): JSX.Element {
    const destinations:string[] = []
    const likes:number[] = []
    props.vacations.map(vacation =>{
        destinations.push(vacation.destination);
        likes.push(vacation.followersCount);
    })
    const data = {
        labels : destinations,
        datasets : [{
            label:'likes per vacation',
            data: likes,
            backgroundColor:'aqua',
            borderColor: 'black',
            borderWidth: 1,
        }]
    }
    const options = {

    }
    return (
        <div className="ReportChart">
			<h1>chart:</h1>
            <Bar data={data}
            options={options}></Bar>
        </div>
    );
}

export default ReportChart;
