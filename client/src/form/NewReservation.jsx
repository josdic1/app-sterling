import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import ReservationContext from "../context/ReservationContext"

function NewReservation () {
    const { handleAdd} = useContext(ReservationContext)

    const [ formData, setFormData ] = useState({
        mid: "",
        room: ""
    })

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
        const newReservation = {
            ...formData
        }
        handleAdd(newReservation)
        onCancel()
    }

    function onClear() {
        setFormData({
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
    <button type='submit'> Submit </button>
    <button type='button' onClick={onClear}> Clear </button>
    <button type='button' onClick={onCancel}> Cancel </button>
</form>
</>
)}

export default NewReservation
