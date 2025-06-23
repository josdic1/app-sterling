import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import ReservationContext from "../context/ReservationContext"

function EditReservation () {
    const { reservations, handleUpdate } = useContext(ReservationContext)

    const [ formData, setFormData ] = useState({
        id: "",
        mid: "",
        room: ""
    })
    

    const { id } = useParams()

    useEffect(() => {
    const found = reservations.find(res => res.id === id)
    setFormData({
        id: found.id,
        mid: found.mid,
        room: found.room
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
        const updatedReservation = {
            ...formData
        }
        handleUpdate(updatedReservation)
        onCancel()
    }

    function onClear() {
        setFormData({
        id: "",
        mid: "",
        room: "" 
        })
    }

    function onCancel() {
        onClear()
        navigate('/')
    }

return (
<>
<form onSubmit={onSubmit}>
    <label htmlFor="mid"> Member ID: </label>
    <input type="text" id="mid" name="mid" onChange={onFormChange} value={formData.mid} placeholder="MID#..." />
        <label htmlFor="room"> Room: </label>
    <input type="text" id="room" name="room" onChange={onFormChange} value={formData.room} placeholder="Room..." />
    <button type='submit'> Update </button>
    <button type='button' onClick={onCancel}> Cancel </button>
</form>
</>
)}

export default EditReservation