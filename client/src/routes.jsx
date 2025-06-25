import App from "./App"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import EditMember from "./form/EditMember"
import EditReservation from "./form/EditReservation"
import Login from "./pages/Login"
import Member from "./pages/Member"
import NewMember from "./form/NewMember"
import NewReservation from "./form/NewReservation"
import Members from "./list/Members"
import RedirectHome from "./components/RedirectHome"
import Reservations from "./list/Reservations"
import Reservation from "./pages/Reservation"

const routes = [
    { path: "/", element: <App />, errorElement: <Error />, 
        children: [
            { index: true, element: <RedirectHome /> },
            { path: "/member/:id", element: <Member />, errorElement: <Error /> },
            { path: "/members", element: <Members />, errorElement: <Error /> },
            { path: "/new/member", element: <NewMember />, errorElement: <Error />},
            { path: "/edit/member/:id", element: <EditMember />, errorElement: <Error /> },
             { path: "/reservation/:id", element: <Reservation />, errorElement: <Error /> },
            { path: "/reservations", element: <Reservations />, errorElement: <Error /> },
            { path: "/new/reservation", element: <NewReservation />, errorElement: <Error /> },
            { path: "/edit/reservation/:id", element: <EditReservation />, errorElement: <Error /> },
              { path: "/login", element: <Login />, errorElement: <Error /> },
                { path: "/home", element: <Dashboard />, errorElement: <Error /> }

        ]
    }
]

export default routes