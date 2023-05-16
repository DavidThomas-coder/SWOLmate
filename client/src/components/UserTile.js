import React from "react";
// import { Link } from "react-router-dom";

const UserTile = (props) => {
    const { user } = props

    return (
        <div>
            <p>{user.firstName}</p>
            <p>{user.age}</p>
            <p>{user.pronouns}</p>
            <p>{user.cityNeighborhood}</p>
        </div>
    )
}

export default UserTile