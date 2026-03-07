import React, {  useEffect } from 'react';
import { useState } from 'react';
import { auth, db } from "../service/firebase.service";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import '../style/profile.css'

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());

            }
            else {
                toast.error("User data not found. Please sign in again.", {
                    position: "top-center"
                })
                navigate("/create")
            }

        })
    }

    const handleLogout = async () => {
        try {
            await auth.signOut();
            toast.success("Logged out successfully!", {
                position: "top-center"
            })
            navigate("/")
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Error logging out. Please try again.", {
                position: "top-center"
            })
        }
    }

    useEffect(() => { fetchUserData() }, [])


    return (
        <div className="profile-root">
            {userData ? (
                <div className="profile-card">

                    <h2 className="profile-title">
                        Welcome <span>{userData?.name || "User"}</span>
                    </h2>

                    <div className="profile-divider"></div>

                    <p className="profile-email">
                        {userData?.email || "Not available"}
                    </p>

                    <div className="profile-bio">
                        <p>
                            Coffee may not solve my problems, but it's worth a shot ☕
                            <br />
                            New bio. Who’s this?
                            <br />
                            I’m sorry for what I said when I was hungry 🍕
                        </p>
                    </div>

                    <div className="profile-actions">
                        <button className="profile-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                </div>
            ) : (
                <div className="premium-loader">
                    <div className="loader-content">
                        <div className="spinner">
                            <div></div><div></div><div></div><div></div>
                        </div>
                        <h2>Loading...</h2>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Profile;
