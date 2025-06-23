import { useState, useEffect } from "react"
import MemberContext from "../context/MemberContext"

function MemberProvider({children}) {
   const [ members, setMembers ] = useState([])

useEffect(() => {
   fetchData()
}, [])

async function fetchData() {
   try {
      const r = await fetch(`http://localhost:3000/members`)
      if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      setMembers(data)
   }catch (error) {console.error("❌ Caught error:", error);}
}

async function handleAdd(newMem) {
   try {
      const r = await fetch(`http://localhost:3000/members`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newMem)
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = [...members, data]
      setMembers(updated)
    }catch (error) {console.error("❌ Caught error:", error);}
}

async function handleEdit(updatedMem) {
   try {
      const r = await fetch(`http://localhost:3000/members/${updatedMem.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedMem)
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = members.map(mem => (
         mem.id === data.id ? data : mem
      ))
      setMembers(updated)
    }catch (error) {console.error("❌ Caught error:", error);}
}

async function handleDelete(memId) {
   try {
      const r = await fetch(`http://localhost:3000/members/${memId}`, {
         method: 'DELETE'
      })
           if(!r.ok) {
         throw new Error("💥 Error");
      }
      const data = await r.json()
      const updated = members.filter(mem => (
         mem.id !== data.id
      ))
      setMembers(updated)
    }catch (error) {console.error("❌ Caught error:", error);}
}

return (
<>
<MemberContext.Provider
value={{ members, handleAdd, handleEdit, handleDelete }}
>
   {children}
</MemberContext.Provider>
</>
)}

export default MemberProvider
