import { NavLink } from "react-router-dom"

function NavBar() {

return (
<>
<nav>
<NavLink to="/"> Home </NavLink>
<NavLink to="/new/reservation"> NEW Reservation </NavLink>
<NavLink to="/reservations"> VIEW Reservations </NavLink>
<NavLink to="/new/member"> NEW Member </NavLink>
<NavLink to="/members"> VIEW Members </NavLink>
</nav>
</>
)}

export default NavBar
