import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import MemberContext from "../context/MemberContext"

function NewMember () {
    const { handleAdd } = useContext(MemberContext)
    
    const [ formData, setFormData ] = useState({
        member: ""
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
        const newMember = {
            ...formData
        }
        handleAdd(newMember)
         onCancel()
    }

    function onClear() {
        setFormData({
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
    <input type="text" id="member" name="member" onChange={onFormChange} value={formData.member} placeholder="Member name..." />
    <button type='submit'> Submit </button>
    <button type='button' onClick={onClear}> Clear </button>
    <button type='button' onClick={onCancel}> Cancel </button>
</form>
</>
)}

export default NewMember
