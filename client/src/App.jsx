import { Outlet } from "react-router-dom"
import reactLogo from "./assets/react.svg"
import MemberProvider from "./providers/MemberProvider"
import NavBar from "./components/NavBar"
import ReservationProvider from "./providers/ReservationProvider"

function App() {
  
  return (
    <>
     <header>
          <img src={reactLogo} className="logo react" alt="React logo"/>
          <NavBar />
     </header>
     <main>
      <MemberProvider>
        <ReservationProvider>
      <Outlet />
      </ReservationProvider>
      </MemberProvider>
     </main>
    </>
  )
}

export default App
