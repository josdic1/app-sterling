
function Reservation({ reservation, onEditClick, onDeleteClick }) {

    const onEdit = (id) => {
        onEditClick(id)
    }

    const onDelete = (id) => {
        onDeleteClick(id)
    }


return (
<>
<tr id={reservation.id}>
    <td>{reservation.id}</td>
        <td>{reservation.mid}</td>
            <td>{reservation.room}</td>
                <td>
            <button id={reservation.id} type="button" name="edit" onClick={() => onEdit(reservation.id)}>Edit</button>
        </td>
        <td>
            <button id={reservation.id} type="button" name="delete" onClick={() => onDelete(reservation.id)}>Del</button>
        </td>

</tr>
</>
)}

export default Reservation
