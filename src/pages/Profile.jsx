import React, { useEffect } from 'react';
import { useState } from 'react';
import { auth } from "../service/firebase.service.js";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import '../style/profile.css'


const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);



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

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserData(user);
            setLoading(false);
            console.log(user);
            
        });



        return () => unsubscribe();

    }, []);


    if (loading) {
        return (
            <div className="premium-loader">
                <div className="loader-content">
                    <div className="spinner">
                        <div></div><div></div><div></div><div></div>
                    </div>
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }



    return (
        <div className="profile-root">
            {userData && (
                <div className="profile-card">

                    <div className="logo">
                        <img src={userData?.photoURL || "https://i.pinimg.com/avif/736x/50/2f/b3/502fb3355fe33c2cd5b7aa358d05fb4b.avf"} className='ProfileLogo' alt="Profile" />
                    </div>

                    <h2 className="profile-title">
                        Welcome <span>{userData.displayName}</span>
                    </h2>

                    <div className="profile-divider"></div>

                    <p className="profile-email">
                        {userData.email}
                    </p>

                    <div className="profile-actions">
                        <button className="profile-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                </div>
            )}
        </div>
    )


};

export default Profile;
