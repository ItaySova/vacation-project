import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import { useState, useEffect } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => unsubscribe();

    }, []);

    return (
        <div className="Menu">

            {!user &&
                <>
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
            }
            {user &&
            <>
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
            {user.roleId === 1 &&
            <>
			<NavLink to="/insert">Insert</NavLink>
            <span> | </span>
            <NavLink to="/vacationsReport">Vacations report</NavLink>
            <span> | </span>
			<NavLink to="/list">Vacations List</NavLink>
            <span> | </span>
            </>
            }
            {user.roleId === 2 &&
            <>
            <NavLink to="/vacations">Vacations list</NavLink>
            <span> | </span>
            </>
            }
            </>}
        </div>
    );
}

export default Menu;
