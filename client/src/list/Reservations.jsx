import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Reservation from "../components/Reservation"
import ReservationContext from "../context/ReservationContext"

function Reservations() {
    const { reservations, handleDelete } = useContext(ReservationContext)

    const navigate = useNavigate()

    const onEditClick = (reservationId) => {
        navigate(`/edit/reservation/${reservationId}`)
    }

    const onDeleteClick = (reservationId) => {
        handleDelete(reservationId)
        navigate("/")
    }

    const listData = reservations.map(res => (
        <Reservation 
        key={res.id} 
        reservation={res} 
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        />
    ))

return (
<>
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>MID</th>
            <th>Room</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {listData}
    </tbody>
</table>
</>
)}

export default Reservations
