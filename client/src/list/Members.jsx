import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Member from "../components/Member"
import MemberContext from "../context/MemberContext"

function Members() {
    const { members, handleDelete } = useContext(MemberContext)

    const navigate = useNavigate()

    const onEditClick = (memberId) => {
        navigate(`/edit/member/${memberId}`)
    }

    const onDeleteClick = (memberId) => {
        handleDelete(memberId)
        navigate("/")
    }

    const listData = members.map(mem => (
        <Member 
        key={mem.id} 
        member={mem} 
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
            <th>Name</th>
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

export default Members
