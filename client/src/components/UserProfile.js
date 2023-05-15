import React from "react"

const UserProfile = ({ user }) => {
    return (
        <div className="userProfile">
            <h1>Welcome to SWOLmate!</h1>
            <p>Your Name: {user.firstName}</p>
            <p>Your Email: {user.email}</p>
            <p>Your Age: {user.age}</p>
            <p>Your Pronouns: {user.pronouns}</p>
            <p>Your City/Neighborhood: {user.cityNeighborhood}</p>
            <p>Your Experience Level: {user.experienceLevel}</p>
        </div>
        );
}

export default UserProfile