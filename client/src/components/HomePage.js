import React, { useState, useEffect } from "react";
import UserTile from "./UserTile";

const HomePage = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const response = await fetch ("/api/v1/users")
            if (response.ok) {
                const data = await response.json()
                setUsers(data.users)
            } else {
                console.error("Failed to fetch users:", response.statusText)
            } 
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const userTiles = users.map((user) => {
        return <UserTile key={user.id} user={user} />
    })

    return (
        <div className="homepage">
            <h1 className="homepage-title">SWOLmate</h1>
            <h3 className="homepage-subtitle">Find your perfect gym buddy!</h3>
            <h5 className="homepage-subtitle">Created by David Thomas</h5>
            <img src="https://i.imgur.com/efGAkY0.jpg" alt="gym image" />
            <div className="user-list">{userTiles}</div>
    </div>
    );
};

export default HomePage;
