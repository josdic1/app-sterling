import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import ReservationContext from "../contexts/ReservationContext"

function EditReservation() {
    const { id } = useParams(); // Get the ID from the URL
    const { reservations, handleEdit } = useContext(ReservationContext); // Access context
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        member: "",
        room: "",
        arrival: "",
        guests: 0,
        guest_array: "", // Ensure initial state is an empty string
        notes: ""
    });

        const [startDate, setStartDate] = useState(new Date()); 

useEffect(() => {
        if (reservations.length > 0 && id) {
            const foundReservation = reservations.find(res => res.id === id);
            if (foundReservation) {
                // Ensure arrival date is correctly formatted for datetime-local input
                const formattedArrival = foundReservation.arrival
                    ? new Date(foundReservation.arrival).toISOString().slice(0, 16)
                    : "";

                setFormData({
                    id: foundReservation.id,
                    member: foundReservation.member,
                    room: foundReservation.room,
                    arrival: formattedArrival,
                    guests: foundReservation.guests || 0, // Ensure it's a number
                    notes: foundReservation.notes || "",
                    // *** HERE'S THE FIX FOR guest_array ***
                    guest_array: Array.isArray(foundReservation.guest_array)
                                 ? foundReservation.guest_array.join('; ') // Join array elements with '; '
                                 : foundReservation.guest_array || "" // If it's already a string or null/undefined, use it as is
                });
            }
        }
    }, [id, reservations]); 

        useEffect(() => {
        if (startDate) {
            const formattedDate = startDate.toISOString().slice(0, 16);
            setFormData(prev => ({
                ...prev,
                arrival: formattedDate
            }));
        }
    }, [startDate]);

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
            ...formData,
            guest_array: formData.guest_array.split(',').map(s => s.trim()).filter(s => s)
        }
        handleEdit(updatedReservation)
        onCancel()
    }

    function onClear() {
        setFormData({
        id: "",
        member: "",
        arrival: "",
        room: "",
        guests: 0,
        guest_array: [],
        notes: ""
        })
    }

    function onCancel() {
        onClear()
        navigate('/home')
    }

return (
<>
<form onSubmit={onSubmit}>
    <input type="text" id="member" name="member" onChange={onFormChange} value={formData.member} placeholder="Member..." />
        <label htmlFor="room"> Room: </label>
    <select id="room" name="room" onChange={onFormChange} value={formData.room}>
        <option disabled value="">Room...</option>
         <option value="a">A</option>
         <option value="b">B</option>
         <option value="c">C</option>
         <option value="d">D</option>
         <option value="e">E</option>
    </select>
     <label htmlFor="arrival"> Arrival Date & Time: </label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect // Enables time selection
                dateFormat="Pp" // Displays date and time (e.g., 'MM/dd/yyyy h:mm aa')
                timeFormat="p" // Displays time only (e.g., '3:00 PM')
                timeIntervals={15} // Time selection in 15-minute intervals
                minDate={new Date()} // Disables past dates
                // minTime={new Date()} // Optional: Disables past times on the current day
                // maxTime={new Date().setHours(23, 59, 59)} // Optional: Restrict max time on current day
                // filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} // Example: Disable weekends
                // excludeDates={[new Date("2025-01-01")]} // Example: Exclude specific dates
            />
       {/* <label htmlFor="arrival">Arrival Date & Time:</label>
      <input
        type="datetime-local"
        id="arrival"
        value={formData.arrival}
        onChange={onFormChange} 
        step="900" 
      /> */}
            <label htmlFor="guests"> Guests: </label>
          <input disabled type="number" id="guests" name="guests" onChange={onFormChange} value={formData.guests + 1} placeholder="Additional guests..." />
            <label htmlFor="guest_array"> Guest list </label>
          <input type="text" id="guest_array" name="guest_array" onChange={onFormChange} value={formData.guest_array} placeholder="Guest name(s)..." />
      <label htmlFor="notes"> Notes: </label>
          <input type="text" id="notes" name="notes" onChange={onFormChange} value={formData.notes} placeholder="Notes..." />
    <button type='submit'> Update </button>
    <button type='button' onClick={onCancel}> Cancel </button>
</form>
</>
)}

export default EditReservation