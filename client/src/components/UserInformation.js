import React from "react"

const UserInformation = (props) => {
    const { user } = props
    
    return (
        <div className="user-information">
            <h4>{user.firstName}</h4>
            <p>Age: {user.age}</p>
            <p>Experience Level: {user.experienceLevel}</p>
        </div>
    )
}

export default UserInformation
