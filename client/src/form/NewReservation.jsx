import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import ReservationContext from "../contexts/ReservationContext"
import CurrentUserContext from "../contexts/CurrentUserContext"

function NewReservation () {
    const { handleAdd } = useContext(ReservationContext)
const { currentUser } = useContext(CurrentUserContext)
 const [startDate, setStartDate] = useState(new Date());



    const [ formData, setFormData ] = useState({
        member_id: "",
        member: "",
        room: "",
        arrival: "",
        guests: "",
        guest_array: "", // This will now directly hold the semicolon-separated string visible in the input
        notes: ""
    })

    // REMOVE: const [currentGuestInput, setCurrentGuestInput] = useState(''); // No longer needed for this approach

    const navigate = useNavigate()

    useEffect(() => {
        if(currentUser.id) {
          setFormData(prev => ({
            ...prev,
            member_id: currentUser.id,
            member: currentUser.member
          }))  
        }
    },[currentUser])

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
        // No special handling needed here anymore for guest_array.
        // All fields update formData directly.
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const onKeyDownGuestArray = (e) => {
        // We only care about Tab and Enter for 'finalizing' an entry segment.
        // Semicolon (;) should just be typed as part of the string.
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault(); // Prevents default browser actions (like tabbing to next field)

            const currentInputValue = e.target.value.trim(); // Get the current full content of the input

            if (currentInputValue) {
                let newValue = currentInputValue;
                // If the current value doesn't already end with a semicolon and space, add it.
                // This prevents double semicolons if the user types one manually and then hits Tab.
                if (!newValue.endsWith('; ')) {
                    newValue = `${newValue}; `;
                }

                setFormData(prev => ({
                    ...prev,
                    guest_array: newValue // Update formData directly with the new, appended string
                }));
                // The input will automatically reflect the updated formData.guest_array because of `value={formData.guest_array}`
            }
        }
    };

    function onSubmit(e) {
        e.preventDefault()

        // Process the guest_array string into an array before sending
        // This logic remains the same and is correct for splitting by semicolon
        const guestArrayProcessed = formData.guest_array
            .split(';')                  // Split by semicolon
            .map(s => s.trim())          // Trim whitespace from each part
            .filter(s => s);             // Remove any empty strings (e.g., from trailing semicolons)

        const newReservation = {
            ...formData,
            guest_array: guestArrayProcessed, // Use the processed array for submission
            guests: guestArrayProcessed.length, // Update guests count based on the processed array
        }
        handleAdd(newReservation)
        onCancel()
    }

    function onClear() {
        setFormData({
            member_id: "",
            member: "",
            room: "",
            arrival: "",
            guests: 0,
            guest_array: "", // Reset this to an empty string
            notes: ""
        })
        // REMOVE: setCurrentGuestInput(''); // No longer needed
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
       {/* <label htmlFor="arrival">Arrival Date & Time:</label>
      <input
        type="datetime-local"
        id="arrival"
        value={formData.arrival}
        onChange={onFormChange} 
        step="900" 
      /> */}
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
           <label htmlFor="guests"> Guests: </label>
          {/* guests field will be disabled and updated automatically based on guest_array length */}
          <input disabled type="number" id="guests" name="guests" value={formData.guests} placeholder="Additional guests..." />
            <label htmlFor="guest_array"> Guest list </label>
          <input
            type="text"
            id="guest_array"
            name="guest_array"
            onChange={onFormChange} // This now updates formData.guest_array directly
            onKeyDown={onKeyDownGuestArray} // This handles Tab/Enter for auto-semicolon
            value={formData.guest_array} // <-- IMPORTANT: Bind to formData.guest_array directly
            placeholder="Type guest names, press Tab/Enter after each, or use semicolons."
          />
      <label htmlFor="notes"> Notes: </label>
          <input type="text" id="notes" name="notes" onChange={onFormChange} value={formData.notes} placeholder="Notes..." />
    <button type='submit'> Submit </button>
    <button type='button' onClick={onClear}> Clear </button>
    <button type='button' onClick={onCancel}> Cancel </button>
</form>
</>
)}

export default NewReservation