import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Vacations from "../../DataArea/vacations/vacations";
import VacationsReport from "../../DataArea/VacationsReport/VacationsReport";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vacations" element={<Vacations />} />
            <Route path="/vacationsReport" element={<VacationsReport />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}
// <NavLink to="/vacationsReport">Vacations report</NavLink>
export default Routing;
