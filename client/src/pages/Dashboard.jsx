// src/components/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ReservationContext from "../contexts/ReservationContext"; // To check loading/counts
import MemberContext from "../contexts/MemberContext";       // To check loading/counts
import Loader from "../components/Loader";

function Dashboard() {
    const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
    const { reservations, loading: reservationsLoading } = useContext(ReservationContext);
    const { members, loading: membersLoading } = useContext(MemberContext); // Get members data and loading state

    const navigate = useNavigate();

    // Combine loading states: Dashboard is loading if either context is loading its data
    const isLoadingData = reservationsLoading || membersLoading;

    // --- Authentication Check (remains the same) ---
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null; // Or a simple "Redirecting..." message while useEffect runs
    }

    // --- Role Determination ---
    const isAdmin = currentUser.role === 'admin';
    const currentMemberId = currentUser.id;

    // --- Initial Loading State for Dashboard Content ---
    if (isLoadingData) {
        return <Loader />; // Show a general loader until all essential data is fetched
    }

    // --- Render based on User Role ---
    return (
        <div className="dashboard-container">
            <h1>{`Welcome Back, ${currentUser.member}`}</h1>

            {isAdmin ? (
                // ==== ADMIN DASHBOARD VIEW ====
                <div className="admin-dashboard">
                    <h2>Admin Control Panel</h2>
                    <p>You have full administrative privileges.</p>

                    <div className="dashboard-summary">
                        <h3>Summary:</h3>
                        <p>Total Reservations: <strong>{reservations.length}</strong></p>
                        <p>Total Members: <strong>{members.length}</strong></p>
                    </div>

                    <div className="dashboard-actions">
                        <h3>Quick Actions:</h3>
                        <ul>
                            <li><button onClick={() => navigate('/reservations')}>View All Reservations</button></li>
                            <li><button onClick={() => navigate('/members')}>Manage All Members</button></li>
                            <li><button onClick={() => navigate('/new/reservation')}>Create New Reservation</button></li>
                            {/* Add more admin-specific links/buttons here */}
                        </ul>
                    </div>
                </div>
            ) : (
                // ==== REGULAR USER DASHBOARD VIEW ====
                <div className="user-dashboard">
                    <h2>Your Personal Overview</h2>
                    <p>Access your profile and reservations quickly.</p>

                    <div className="dashboard-actions">
                        <h3>Your Information:</h3>
                        <ul>
                            {/* Link to user's own profile for editing */}
                            <li>
                                <button onClick={() => navigate(`/edit/member/${currentMemberId}`)}>Edit My Profile</button>
                                <p style={{ fontSize: '0.9em', color: '#676566' }}>Role: {currentUser.role}</p>
                            </li>
                        </ul>
                    </div>

                    <div className="dashboard-actions">
                        <h3>Your Reservations:</h3>
                        <ul>
                            {/* The /reservations route will automatically filter to 'My Reservations' */}
                            <li><button onClick={() => navigate('/reservations')}>View My Reservations</button></li>
                            <li><button onClick={() => navigate('/new/reservation')}>Make a New Reservation</button></li>
                        </ul>
                        {/* Display a quick count of *their* reservations */}
                        <p>You have <strong>{reservations.filter(res => res.member_id === currentMemberId).length}</strong> active reservations.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;