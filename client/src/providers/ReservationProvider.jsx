import { useState, useEffect } from "react"
import ReservationContext from "../context/ReservationContext"

function ReservationProvider({children}) {
   const [ reservations, setReservations ] = useState([])

useEffect(() => {
   fetchData()
}, [])

async function fetchData() {
   try {
      const r = await fetch(`http://localhost:3000/reservations`)
      if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      setReservations(data)
   }catch (error) {console.error("❌ Caught error:", error);}
}

async function handleAdd(newRes) {
   try {
      const r = await fetch(`http://localhost:3000/reservations`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newRes)
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = [...reservations, data]
      setReservations(updated)
    }catch (error) {console.error("❌ Caught error:", error);}
}

async function handleEdit(updatedRes) {
   try {
      const r = await fetch(`http://localhost:3000/reservations/${updatedRes.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedRes)
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = reservations.map(res => (
         res.id === data.id ? data : res
      ))
      setReservations(updated)
    }catch (error) {console.error("❌ Caught error:", error);}
}

async function handleDelete(resId) {
   try {
      const r = await fetch(`http://localhost:3000/reservations/${resId}`, {
         method: 'DELETE'
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = reservations.filter(res => (
         res.id !== data.id
      ))
      setReservations(updated)
    }catch (error) {console.error("❌ Caught error:", error);}
}

return (
<>
<ReservationContext.Provider
value={{ reservations, handleAdd, handleEdit, handleDelete }}
>
   {children}
</ReservationContext.Provider>
</>
)}

export default ReservationProvider
