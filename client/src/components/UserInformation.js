import React from "react"

const UserInformation = (props) => {
    const { user } = props
    
    return (
        <div className="user-information">
            <div className="user-info-left">
                <h3>{user.firstName}</h3>
                <p>Age: {user.age}</p>
                <p>{user.pronouns}</p>
                <p>
                {user.cityNeighborhood}, {user.state}
                </p>
                <p>Experience Level: {user.experienceLevel}</p>
            </div>
            <div className="user-info-right">
                <img
                src={user.imageUrl || "https://i.imgur.com/cFrP4WI.png"}
                alt="Profile"
                className="profile-image"
                />
            </div>
        </div>
    )
}

export default UserInformation
