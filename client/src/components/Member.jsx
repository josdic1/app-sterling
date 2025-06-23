
function Member({ member, onEditClick, onDeleteClick }) {

    const onEdit = (id) => {
        onEditClick(id)
    }

        const onDelete = (id) => {
        onDeleteClick(id)
    }


return (
<>
<tr id={member.id}>
    <td>{member.id}</td>
        <td>{member.member}</td>
                <td>
            <button id={member.id} type="button" name="edit" onClick={() => onEdit(member.id)}>Edit</button>
        </td>
        <td>
            <button id={member.id} type="button" name="delete" onClick={() => onDelete(member.id)}>Del</button>
        </td>

</tr>
</>
)}

export default Member
