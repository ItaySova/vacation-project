import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/list">List</NavLink>
            <span> | </span>
			<NavLink to="/insert">Insert</NavLink>
            <span> | </span>
            <NavLink to="/vacations">Vacations list</NavLink>
            <span> | </span>
            <NavLink to="/vacationsReport">Vacations report</NavLink>
        </div>
    );
}

export default Menu;
