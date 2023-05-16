import React from "react";
// import { Link } from "react-router-dom";

const UserTile = (props) => {
    const { user } = props

    return (
        <div className="user-tile cell medium-6">
            <p>{user.firstName}</p>
            <p>{user.age}</p>
            <p>{user.pronouns}</p>
            <p>{user.cityNeighborhood}</p>
            <button>Message This User!</button>
        </div>
    )
}

export default UserTile