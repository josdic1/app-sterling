import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import MemberContext from "../context/MemberContext"

function EditMember () {
    const { members, handleEdit } = useContext(MemberContext)

    const [ formData, setFormData ] = useState({
        id: "",
        member: ""
    })
    
    const { id } = useParams()

    useEffect(() => {
    const found = members.find(mem => mem.id === id)
        setFormData({
            id: found.id,
            member: found.member
        })
    },[id])

    const navigate = useNavigate()

    const onFormChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    function onSubmit(e) {
        e.preventDefault()
        const updatedMember = {
            ...formData
        }
        handleEdit(updatedMember)
        onCancel()
    }

    function onClear() {
        setFormData({
        id: "",
        member: ""
        })
    }

    function onCancel() {
        onClear()
        navigate('/')
    }

return (
<>
<form onSubmit={onSubmit}>
    <label htmlFor="member"> Member: </label>
    <input type="text" id="member" name="member" onChange={onFormChange} value={formData.member} placeholder="Member..." />
    <button type='submit'> Update </button>
    <button type='button' onClick={onCancel}> Cancel </button>
</form>
</>
)}

export default EditMember