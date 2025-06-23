import App from "./App"
import Error from "./pages/Error"
import EditMember from "./form/EditMember"
import EditReservation from "./form/EditReservation"
import NewMember from "./form/NewMember"
import NewReservation from "./form/NewReservation"
import Members from "./list/Members"
import Reservations from "./list/Reservations"

const routes = [
    { path: "/", element: <App />, errorElement: <Error />, 
        children: [
            { path: "/members", element: <Members />, errorElement: <Error /> },
            { path: "/reservations", element: <Reservations />, errorElement: <Error /> },
            { path: "/edit/member/:id", element: <EditMember />, errorElement: <Error /> },
            { path: "/edit/reservation/:id", element: <EditReservation />, errorElement: <Error /> },
            { path: "/new/member", element: <NewMember />, errorElement: <Error />},
            { path: "/new/reservation", element: <NewReservation />, errorElement: <Error /> }

        ]
    }
]

export default routes