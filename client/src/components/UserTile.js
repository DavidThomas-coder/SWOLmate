import React from "react";

const UserTile = (props) => {
    const { user, onChatRequest, chatRequestSent } = props

    const handleClick = (event) => {
        event.preventDefault()
        onChatRequest(event, user.id)
    }

    return (
        <div className="user-tile cell medium-6">
            <p>{user.firstName}</p>
            <p>{user.age}</p>
            <p>{user.pronouns}</p>
            <p>{user.cityNeighborhood}</p>
            <button onClick={handleClick} disabled={chatRequestSent}>
                {chatRequestSent ? "Request Sent" : "Message This User!"}
            </button>
        </div>
    )
}

export default UserTile