import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Vacations from "../../DataArea/vacations/vacations";
import VacationsReport from "../../DataArea/VacationsReport/VacationsReport";
import EditVacation from "../../DataArea/EditVacation/EditVacation";
import UsersTable from "../../DataArea/UsersTable/UsersTable";
import EditUser from "../../DataArea/EditUser/EditUser";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vacations" element={<Vacations />} />
            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
            <Route path="/vacationsReport" element={<VacationsReport />} />
            <Route path="/users" element={<UsersTable />} />
            <Route path="/users/edit" element={<EditUser />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
