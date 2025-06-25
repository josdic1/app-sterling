import { NavLink } from "react-router-dom"
import { useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"

function NavBar() {
const { currentUser, isLoggedIn, handleLogout } = useContext(CurrentUserContext)

let roleDisplay;

function onClick() {
    handleLogout()
}

if(isLoggedIn) {
        if(currentUser.role === "admin") {
           roleDisplay = <nav>
<NavLink to="/"> Home </NavLink>
<NavLink to="/new/reservation"> NEW Reservation </NavLink>
<NavLink to="/reservations"> VIEW Reservations </NavLink>
<NavLink to="/new/member"> NEW Member </NavLink>
<NavLink to="/members"> VIEW Members </NavLink>
<NavLink to="/login" type="button" onClick={onClick}> Logout </NavLink>
</nav> 
        } else {
              roleDisplay = <nav>
<NavLink to="/"> Home </NavLink>
<NavLink to="/login" type="button" onClick={onClick}> Logout </NavLink>
</nav>   
        }
    } else {
        roleDisplay = <h1>Please Log In</h1>
    }


return (

<>
{roleDisplay}
</> 

)}

export default NavBar
