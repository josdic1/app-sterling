import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import MemberContext from "../contexts/MemberContext"

function Login() {
    const { members } = useContext(MemberContext)
    const { handleLogin } = useContext(CurrentUserContext)

    const [ formData, setFormData] = useState({
        member: ""
    })

    const [ user, setUser] = useState({
        id: "",
        member: "",
        role: ""
    })

    useEffect(() => {
        const match = members.find(m => (
            m.member.toLowerCase() === formData.member.toLowerCase()
        ))
        setUser(match)
    },[members, user, formData])

    const navigate = useNavigate()
    const onFormChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userId = user
        handleLogin(userId)
    navigate('/home')
    onClear()
    }

    function onClear() {
      setFormData({
        member: ""
      })  
      setUser({
        id: ""
      })
    }

    return (
    <>
    <form onSubmit={onSubmit}>
    <label htmlFor="member">🔒 </label>
    <input type="text" name="member" id="member" onChange={onFormChange} value={formData.member} placeholder="User Login..."/>
    {user ? <button type="submit">Login</button> : ""}
    <button type="button" onClick={onClear}> Clear </button>
    </form>
    </>
    )}

    export default Login

